import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    html: {
      type: String,
      require: true,
    },
    isOnlyForSubscribers: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

const TemplateModel = mongoose.model('templates', templateSchema);

if (mongoose.models && mongoose.models.templates) {
  delete mongoose.models.templates;
}

export default TemplateModel;
