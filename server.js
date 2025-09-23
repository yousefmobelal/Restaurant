import express from "express";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_url);
