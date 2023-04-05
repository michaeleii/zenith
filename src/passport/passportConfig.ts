import passport from "passport";
import prisma from "../client";
import local from "./localStrategy";
import IUser from "../../interfaces/IUser";

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
		const user = await prisma.user.findUnique({ where: { id } });
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});

	passport.use(local);
};

export default intializePassport;
