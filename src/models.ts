import { Sequelize, Model, DataTypes, BuildOptions, UUIDV4, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize'

const { POSTGRESQL } = process.env

const sequelize = new Sequelize(POSTGRESQL || '', { dialect: 'postgres', logging: false })
sequelize.authenticate().then(() => console.log('Ξ Database connected')).catch(console.error)

type TModel<T> = typeof Model & { new (values?: object, options?: BuildOptions): T }

type TUser = Model & {
  readonly id: string;
  email: string;
  hmac: string;
  confirmation: string;
  readonly createdAt: Date;
  createUserInfo: HasOneCreateAssociationMixin<TUserInfo>;
  getUserInfo: HasOneGetAssociationMixin<TUserInfo>;
  getRoomRequest: HasOneGetAssociationMixin<TRoomRequest>;
  getRoomOccupation: HasOneGetAssociationMixin<TRoomOccupation>;
}

type TUserInfo = Model & {
  readonly id: string;
  rank: number;
  lastname: string;
  firstname: string;
  dob: Date;
  phone: number;
  profileIcon: string;
}

type TRoom = Model & {
  readonly id: number;
  max: number;
  available: boolean;

  RoomOccupations?: TRoomOccupation[];

  getRoomRequest: HasManyGetAssociationsMixin<TRoomRequest>;
  getRoomOccupation: HasManyGetAssociationsMixin<TRoomOccupation>;
}

type TRoomRequest = Model & {
  readonly id: string;
  readonly uid: string;
  readonly rid: number;
  readonly expire: Date;
  readonly createdAt: Date;

  readonly User?: TUser;
  readonly UserInfo?: TUserInfo;
}

type TRoomOccupation = Model & {
  readonly id: string;
  readonly uid: string;
  readonly rid: number;
  readonly expire: Date;
  readonly createdAt: Date;
}

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  email: {
    type: new DataTypes.STRING(64),
    allowNull: false,
    unique: true
  },
  hmac: {
    type: new DataTypes.STRING(44),
    allowNull: false
  },
  confirmation: {
    type: new DataTypes.STRING(64),
    unique: true
  }
}, { updatedAt: false }) as TModel<TUser>

export const UserInfo = sequelize.define('UserInfo', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  rank: {
    type: new DataTypes.INTEGER(),
    defaultValue: 3,
    allowNull: false
  },
  firstname: {
    type: new DataTypes.STRING(64),
    allowNull: false
  },
  lastname: {
    type: new DataTypes.STRING(64),
    allowNull: false
  },
  dob: {
    type: new DataTypes.DATEONLY(),
    allowNull: false
  },
  phone: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  profileIcon: {
    type: new DataTypes.STRING(32)
  }
}, { timestamps: false }) as TModel<TUserInfo>

export const Room = sequelize.define('Room', {
  id: {
    type: new DataTypes.INTEGER(),
    primaryKey: true
  },
  max: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { timestamps: false }) as TModel<TRoom>

export const RoomRequest = sequelize.define('RoomRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  uid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rid: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  expire: {
    type: new DataTypes.DATEONLY(),
    allowNull: false
  }
}, { updatedAt: false }) as TModel<TRoomRequest>

export const RoomOccupation = sequelize.define('RoomOccupation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  uid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rid: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  expire: {
    type: new DataTypes.DATEONLY(),
    allowNull: false
  }
}, { updatedAt: false }) as TModel<TRoomOccupation>

User.hasOne(UserInfo, { foreignKey: 'id' })
UserInfo.belongsTo(User, { foreignKey: 'id' })

User.hasOne(RoomOccupation, { foreignKey: 'uid' })
RoomOccupation.belongsTo(User, { foreignKey: 'id' })

User.hasOne(RoomRequest, { foreignKey: 'id' })
RoomRequest.belongsTo(User, { foreignKey: 'uid' })

UserInfo.hasOne(RoomOccupation, { foreignKey: 'id' })
RoomOccupation.belongsTo(UserInfo, { foreignKey: 'uid' })

UserInfo.hasOne(RoomRequest, { foreignKey: 'id' })
RoomRequest.belongsTo(UserInfo, { foreignKey: 'uid' })

Room.hasMany(RoomOccupation, { foreignKey: 'rid' })
RoomOccupation.belongsTo(Room, { foreignKey: 'id' })

Room.hasMany(RoomRequest, { foreignKey: 'rid' })
RoomRequest.belongsTo(Room, { foreignKey: 'id' }) // error!
