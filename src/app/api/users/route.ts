import connect from "@/lib/db";
import User from "@/lib/modals/users";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// const ObjectId = require("mongoose").Types.ObjectId;
const ObjectId = Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse("Error in fetching users " + err.message, {
        status: 500,
      });
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse("Error in creating user " + err.message, {
        status: 500,
      });
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const { fullName, email, phoneNumber, regId, password, gender } = body;

    await connect();
    if (
      !userId ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !regId ||
      !password ||
      !gender
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { fullName, email, phoneNumber, regId, password, gender },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User is updated", user: updatedUser }),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse("Error in updating user " + err.message, {
        status: 500,
      });
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Id not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }

    await connect();

    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    );

    if (!deletedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User is deleted", user: deletedUser }),
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse("Error in deleting user " + err.message, {
        status: 500,
      });
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
