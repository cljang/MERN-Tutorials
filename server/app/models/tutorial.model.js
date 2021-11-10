module.exports = mongoose => {
  const Tutorial = mongoose.model(
    "tutorial",
    mongoose.Schema(
      {
        title: {
          type: String,
          required: [true, "Content can not be empty!"]
        },
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Tutorial;
};