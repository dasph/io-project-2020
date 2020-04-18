import { Sequelize, Model, DataTypes, BuildOptions, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, UUIDV4 } from 'sequelize'

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

User.hasOne(UserInfo, { foreignKey: 'id' })
UserInfo.belongsTo(User, { foreignKey: 'id' })
