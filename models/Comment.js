const { Schema, model, Types } = require('mongoose');

const ReplySchema = new Schema(
  {
   // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
  );
  // get total count of comments and replies on retrieval
  CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
  });

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [ReplySchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;