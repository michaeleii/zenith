import passport from "passport";
import db from "../prismaClient";
import local from "./localStrategy";
import IUser from "../../interfaces/User";

declare global {
	namespace Express {
		interface User extends IUser {}
	}
}

const intializePassport = () => {
	// Serialize User
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// Deserialize User
	passport.deserializeUser(async (id: number, done) => {
		const user = await db.prisma.user.findUnique({ where: { id } });
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});

	passport.use(local);
};

export default intializePassport;
