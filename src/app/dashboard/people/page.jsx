"use client";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/utils/firebase";
import { getSociety } from "@/utils/FirebaseFunctions";
import { Router } from "next/navigation";
import React, { useEffect, useState } from "react";

const People = () => {
  const [Society, setSociety] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return Router.push("/signin");
      }
      const society = await getSociety(user.uid);
      setSociety(society);
    });
  }, []);
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default People;
