"use client";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app, db } from "../../../firebase.config";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed up successfully, you can redirect the user or perform any other actions
      console.log("User signed up:", userCredential.user);
      const userDetails = {
        uid: userCredential.user.uid,
        email: email,
        username: username, // Replace with the actual name field
      };
      const usersCollectionRef = collection(db, "users"); // Check if db is initialized correctly
      const docRef = await addDoc(usersCollectionRef, userDetails);
      console.log(
        "User details added to 'users' collection with ID: ",
        docRef.id
      );
      router.push("home");
    } catch (error) {
      // Handle signup errors
      console.error("Signup error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-white text-black h-screen">
      <div className="logincontainer flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl mb-4">Signup</h1>
        <TextField
          id="Username"
          label="Username"
          variant="outlined"
          required={true}
          className="m-2"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h6 className="m-2"></h6>
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          required={true}
          className="m-2"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h6 className="m-2"></h6>
        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          required={true}
          className="m-2"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <h6 className="m-2"></h6>
        <Button className="mt-2" variant="contained" onClick={handleSignup}>
          Signup
        </Button>
        <p className="my-4">
          Already have an account?{" "}
          <span className="text-sky-600">
            <Link href="/signin">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
