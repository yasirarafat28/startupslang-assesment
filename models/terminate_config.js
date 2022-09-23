/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * terminate_config Model
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 *
 */
 const { intersection } = require("lodash");
 const coreModel = require("./../core/models");
 
 module.exports = (sequelize, DataTypes) => {
   const TerminateConfig = sequelize.define(
     "terminate_config",
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
       },
       counter_in_sec: DataTypes.INTEGER,
       title: DataTypes.TEXT,
       message: DataTypes.TEXT,
     },
     {
       timestamps: false,
       freezeTableName: true,
       tableName: "terminate_config",
     },
     {
       underscoredAll: false,
       underscored: false,
     }
   );
 
   coreModel.call(this, TerminateConfig);
 
   TerminateConfig._preCreateProcessing = function (data) {
     return data;
   };
   TerminateConfig._postCreateProcessing = function (data) {
     return data;
   };
   TerminateConfig._customCountingConditions = function (data) {
     return data;
   };
 
   TerminateConfig._filterAllowKeys = function (data) {
     let cleanData = {};
     let allowedFields = TerminateConfig.allowFields();
     allowedFields.push(TerminateConfig._primaryKey());
 
     for (const key in data) {
       if (allowedFields.includes(key)) {
         cleanData[key] = data[key];
       }
     }
     return cleanData;
   };
 
   TerminateConfig.allowFields = function () {
     return ["id", "counter_in_sec","title","message"];
   };
 
   TerminateConfig.labels = function () {
     return ["ID","Counter", "Title","Message"];
   };
 
   TerminateConfig.validationRules = function () {
     return [
       ["id", "ID", ""],
       ["counter_in_sec", "Counter", "required"],
       ["title", "Title", "required"],
       ["message", "Message", "required"],
     ];
   };
 
   TerminateConfig.validationEditRules = function () {
     return [
       ["id", "ID", ""],
       ["counter_in_sec", "Counter", "required"],
       ["title", "Title", "required"],
       ["message", "Message", "required"],
     ];
   };
 
   // ex
   TerminateConfig.intersection = function (fields) {
     if (fields) {
       return intersection(["id", "counter_in_sec","title","message"], Object.keys(fields));
     } else return [];
   };
 
   return TerminateConfig;
 };
 