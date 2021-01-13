module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    //need to decide on what data the message will include
    //the user who sent it
    //the body of the message
    //time/date?
  });
  return Message;
};
