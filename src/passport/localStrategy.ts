import { Strategy as LocalStrategy } from "passport-local";
import db from "../prismaClient";
import bcrypt from "bcrypt";

const local = new LocalStrategy(
	{ usernameField: "email" },
	async (email, password, done) => {
		const user = await db.prisma.user.findUnique({ where: { email } });
		if (!user) {
			return done(null, false, { message: "Incorrect email" });
		} else if (!(await bcrypt.compare(password, user.password))) {
			return done(null, false, { message: "Incorrect password" });
		}
		return done(null, user);
	}
);

export default local;
