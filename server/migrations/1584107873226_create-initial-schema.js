/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users',{
    id:'id',
    username:{type:'text',notNull:true,unique:true},
    email:{type:'text',notNull:true,unique:true},
    password_hash:{type:'text',notNull:true},
    created_at:{
      type:'timestamp',
      notNull:true,
      default:pgm.func('current_timestamp')
    }
  })
};

exports.down = pgm => {};
