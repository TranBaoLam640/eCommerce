const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      trim: true,
      default: '',
    },
    thumbnail: {
      type: String,
      default: null,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    tags: {
      type: [String],
      default: [],
    },
    views_count: {
      type: Number,
      default: 0,
    },
    published_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

postSchema.index({ status: 1 });
postSchema.index({ author_id: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);
