import { getCurrentUser, getMultiplePostsByIds, getUserBookmarks} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import React, { createContext, useContext, useEffect, useState } from "react";

// import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null)


  // Diabetes Checker
  const [sibling, setSibling] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(0);
  const [doctor, setDoctor] = useState(0);
  const [fit, setFit] = useState(0);
  const [bmi, setBmi] = useState(0);

  // Profile
  const [profileGender, setProfileGender] = useState("")
  const [profileAge, setProfileAge] = useState("")
  const [profileHeight, setProfileHeight] = useState("")
  const [profileWeight, setProfileWeight] = useState("")
  const [profileRace, setProfileRace] = useState("")

  

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        sibling,
        setSibling,
        age,
        setAge,
        gender,
        setGender,
        doctor,
        setDoctor,
        fit,
        setFit,
        bmi,
        setBmi,
        profileAge,
        setProfileAge,
        profileGender,
        setProfileGender,
        profileHeight,
        setProfileHeight,
        profileWeight,
        setProfileWeight,
        profileRace,
        setProfileRace
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;