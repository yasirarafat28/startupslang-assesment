const SessionService = require("../../services/SessionService");
const app = require("express").Router();
const db = require("../../models");
const ValidationService = require("../../services/ValidationService");
const role = 1;

app.get("/admin/terminate-config", SessionService.verifySessionMiddleware(role, "admin"), async function (req, res, next) {const configuration = await db.terminate_config.findOne({});
  console.log("🚀 ~ file: Admin_terminateConfiguration_controller.js ~ line 19 ~ configuration", configuration)

  res.render("admin/Terminate_config", {
    title:configuration?.title??"",
    message:configuration?.message??"",
    counterInSec:configuration?.counterInSec??10,
      get_page_name: () => "Terminate Configuration",
    _base_url: "/admin/admin/terminate-config",
  });
});


app.post("/admin/terminate-config", SessionService.verifySessionMiddleware(role, "admin"),ValidationService.validateInput(
  { title: "required", message: "required", counterInSec: "required" },
), async function (req, res, next) {
  let {title, message, counterInSec} = req.body
  let values = {
    title, message, counter_in_sec:counterInSec
  }
  console.log("🚀 ~ file: Admin_terminateConfiguration_controller.js ~ line 36 ~ values", values)

  const configuration = await db.terminate_config.findOne({})
  if (configuration) {
    await db.terminate_config.update(values,{
      where:{id:configuration.id}
    });
  }else{

    await db.terminate_config.create(values);
  }
  
  return res.redirect("/admin/terminate-config");
});


// APIS
app.get("/api/v1/terminate-configuration", async function (req, res, next) {
  try {
    
  const configuration = await db.terminate_config.findOne({})
  res.json({
    title:configuration?.title??"---",
    message:configuration?.message??"---",
    counterInSec:configuration?.counter_in_sec??0
  })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
});
module.exports = app;



module.exports = app;
