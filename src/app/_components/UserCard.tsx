"use client";

import { Mail, Phone, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import React from "react";
import type { IUserData } from "@/constants/interfaces";

interface IUserCardProps {
  user: IUserData;
  userId: string;
  onEdit?: (user: IUserData) => void;
  onDelete?: (userId: string) => void;
}

const UserCard = ({ user, userId, onEdit, onDelete }: IUserCardProps) => {
  const initials = user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="overflow-hidden border-gray-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gray-50 py-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10 border border-gray-20">
            <AvatarFallback className="bg-black text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.fullName}</h3>
            <p className="text-xs text-gray-500">ID: {user.regId}</p>
          </div>
        </div>
        <Badge variant="outline" className="capitalize">
          {user.gender}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4 text-gray-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="mr-2 h-4 w-4 text-gray-500" />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 px-4 py-2 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-black text-black hover:bg-black hover:text-white"
          onClick={() => onEdit?.(user)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          onClick={() => onDelete?.(userId)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
