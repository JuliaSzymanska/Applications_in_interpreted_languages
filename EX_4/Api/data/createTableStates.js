module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("state", {
        status_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        status_name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return State;
};


// ADD CONSTRAINT status_name_in CHECK(status_name IN('Not approved', 'Approved', 'Canceled', 'Completed')),