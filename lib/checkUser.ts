import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
  const current_user = await currentUser();
  if (!current_user) return null;
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: current_user.id,
    },
  });
  if (loggedInUser) {
    return loggedInUser;
  }
  console.log("loggedInUser");
  console.log(loggedInUser);
  console.log("currentUser");
  console.log(currentUser);

  // if not in db, create new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: current_user.id,
      name: `${current_user.firstName} ${current_user.lastName}`,
      imageUrl: current_user.imageUrl,
      email: current_user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
