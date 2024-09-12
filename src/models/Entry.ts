import mongoose from "mongoose";
const { Schema } = mongoose;

const entrySchema = new Schema(
  {
    username: { type: String },
    title: { type: String },
    type: {
      type: String,
      enum: ["link", "text", "attachment"],
      required: true,
    },
    encryptedContent: {
      type: String, // encrypted data (the actual content)
      required: true,
    },
    iv: {
      type: String, // Initialization Vector (IV)
      required: true,
    },
    authTag: {
      type: String, // Authentication tag for AES-GCM to verify integrity
      required: true,
    },
    encryptionAlgo: {
      type: String,
      default: "aes-256-gcm", // Default algorithm
    },
    shareCode: {
      type: String, 
      required: true,
      unique: true,
    },
    passcodeHash: {
      type: String
    },
    expiryDate: {
      type: Date,
      required: false
      
    },
    accessCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    maxAccessCount: {
      type: Number,
      required: false

    },
  },
  { timestamps: true }
);

// @ts-ignore
mongoose.models = {};

export default mongoose.model("Entry", entrySchema);
