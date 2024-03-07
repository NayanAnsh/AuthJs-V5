"use client";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { OnClick } from "@/actions/loginOnClick";

export const Social = () => {
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          OnClick("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          OnClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
