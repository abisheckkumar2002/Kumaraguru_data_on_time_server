//import npm package
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../Config/config.js");
const db = require("../Models/index.js");
const User = db.user;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

// exports.principleAuth = async (passport) => {
//   passport.use(
//     "principleAuth",
//     new JwtStrategy(opts, async (jwt_payload, done) => {
//       await User.findById(jwt_payload._id, (err, user) => {
//         if (err) {
//           return done(err, false);
//         } else if (user) {
//           let data = {
//             Id: user._id,
//             Name: user.name,
//             Department_name: user.dep_id,
//             UserId: user.UserId,
//             TypeId:user.type_id,
//             Email:user.email
//           };
//           return done(null, data);
//         }
//         return done(null, false);
//       });
//     })
//   );
// };

exports.principleAuth = async (passport) => {
  passport.use(
    "principleAuth",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id)
          .populate('dep_id')
          .populate('type_id');

        
        
          if (!user || user.type_id.Type !== "Principal") {  
         
          return done(null, false);
        
        }

        const data = {
          Id: user._id,
          name: user.name,
          dep_name: user.dep_id ? user.dep_id.department : null, // Access the populated department name
          userId: user.UserId,
          user_Type: user.type_id ? user.type_id.Type : null, // Access the populated type name
          email: user.email,
          typeId:user.type_id ? user.type_id : null,
          depId: user.dep_id ? user.dep_id : null,
          eventTypeId:user.eventType_id? user.eventType_id:null,
          usertypeList:user.typeList_id?user.typeList_id:null
          
        };
       
  
        return done(null, data);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};





exports.adminAuth = async (passport) => {
  passport.use(
    "adminAuth",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id)
          .populate('dep_id')
          .populate('type_id');
        
        if (!user|| user.type_id.Type !== "Admin") {
          return done(null, false);
        }

        const data = {
          Id: user._id,
          name: user.name,
          dep_name: user.dep_id ? user.dep_id.department : null, // Access the populated department name
          userId: user.UserId,
          user_Type: user.type_id ? user.type_id.Type : null, // Access the populated type name
          email: user.email,
          typeId:user.type_id ? user.type_id : null,
          depId: user.dep_id ? user.dep_id : null,
          eventTypeId:user.eventType_id? user.eventType_id:null,
          usertypeList:user.typeList_id
          
        };
        console.log(data,"ccccccccccccc")

        return done(null, data);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};






exports.hodAuth = async (passport) => {
  passport.use(
    "hodAuth",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id)  
          .populate('dep_id')
          .populate('type_id');
        
        if (!user|| user.type_id.Type !== "Head Of Department") {
          return done(null, false);
        }

        const data = {
          Id: user._id,
          name: user.name,
          dep_name: user.dep_id ? user.dep_id.department : null, // Access the populated department name
          userId: user.UserId,
          user_Type: user.type_id ? user.type_id.Type : null, // Access the populated type name
          email: user.email,
          typeId:user.type_id ? user.type_id : null,
          depId: user.dep_id ? user.dep_id : null,
          eventTypeId:user.eventType_id? user.eventType_id:null,
          usertypeList:user.typeList_id?user.typeList_id:null
        };

        return done(null, data);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};




exports.monthlyExecutorAuth = async (passport) => {
  passport.use(
    "monthlyExecutorAuth",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id)
          .populate('dep_id')
          .populate('type_id');
        
        if (!user|| user.type_id.Type !== "Montly Executor") {
          return done(null, false);
        }

        const data = {
          Id: user._id,
          name: user.name,
          dep_name: user.dep_id ? user.dep_id.department : null, // Access the populated department name
          userId: user.UserId,
          user_Type: user.type_id ? user.type_id.Type : null, // Access the populated type name
          email: user.email,
          typeId:user.type_id ? user.type_id : null,
          depId: user.dep_id ? user.dep_id : null,
          eventTypeId:user.eventType_id? user.eventType_id:null,
          usertypeList:user.typeList_id?user.typeList_id:null
          
        };

        return done(null, data);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

