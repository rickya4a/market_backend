export default mongoose => {
  let schema = mongoose.Schema(
    {
      action: String,
      percentage: Number,
      reward: Number
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })

  const Quest = mongoose.model("quest", schema);
  return Quest;
};