const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(
      __dirname,
      "../public/uploads/matrimonyPictures"
    );
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const matrimony = require("../models/matrimony.model.js");

const matrimonyController = {
  getAll: (req, res) => {
    matrimony.getAll((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json(results);
    });
  },
  getById: (req, res) => {
    const id = req.user.id;

    matrimony.getById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      results[0].profilePictures = results[0].profilePictures.split(",");

      res.status(200).json(results[0]);
    });
  },
  getFullUser: (req, res) => {
    const id = req.params.id;

    matrimony.getById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      results[0].profilePictures = results[0].profilePictures.split(",");
      results[0].password = undefined;

      res.status(200).json(results[0]);
    });
  },
  getUsers: (req, res) => {
    const id = req.user.id;

    matrimony.getById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      matrimony.getUsers(id, results[0].gender, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        results.forEach((result) => {
          result.profilePictures = result.profilePictures.split(",");
          result.password = undefined;
        });

        res.status(200).json({
          users: results,
        });
      });
    });
  },
  register: [
    upload.array("profilePicture", 3),
    (req, res) => {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phone,
        gender,
        dob,
        timeOfBirth,
        placeOfBirth,
        community,
        religion,
        caste,
        subCaste,
        motherTongue,
        country,
        state,
        city,
        address,
        pincode,
        maritalStatus,
        haveChildren,
        noOfChildren,
        height,
        weight,
        complexion,
        bodyType,
        bloodGroup,
        donateBlood,
        qualification,
        educationSpecialization,
        currentLocation,
        immigrationStatus,
        designation,
        designationDetails,
        annualIncome,
        fatherName,
        fatherOccupation,
        fatherMobile,
        motherName,
        motherOccupation,
        motherMobile,
        grandfatherName,
        grandmotherName,
        nanaName,
        naniName,
        noOfBrothers,
        noOfSisters,
        believeInHoroscope,
        rashi,
        gotra,
        varna,
        mangalShani,
        diet,
        smoke,
        drink,
        hobbies,
        ageGap,
        partnerReligion,
        partnerCaste,
        partnerSubCaste,
        partnerQualification,
        partnerOccupation,
        partnerAnnualIncome,
        mangalik,
        partnerMaritalStatus,
        goAbroad,
        disability,
        disabilityPercentage,
        about,
      } = req.body;

      const profilePicture = req.files.map((file) => file.filename);

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        const newUser = {
          profilePicture,
          firstName,
          lastName,
          email,
          password: hash,
          phone,
          gender,
          dob,
          timeOfBirth,
          placeOfBirth,
          community,
          religion,
          caste,
          subCaste,
          motherTongue,
          country,
          state,
          city,
          address,
          pincode,
          maritalStatus,
          haveChildren,
          noOfChildren,
          height,
          weight,
          complexion,
          bodyType,
          bloodGroup,
          donateBlood,
          qualification,
          educationSpecialization,
          currentLocation,
          immigrationStatus,
          designation,
          designationDetails,
          annualIncome,
          fatherName,
          fatherOccupation,
          fatherMobile,
          motherName,
          motherOccupation,
          motherMobile,
          grandfatherName,
          grandmotherName,
          nanaName,
          naniName,
          noOfBrothers,
          noOfSisters,
          believeInHoroscope,
          rashi,
          gotra,
          varna,
          mangalShani,
          diet,
          smoke,
          drink,
          hobbies,
          ageGap,
          partnerReligion,
          partnerCaste,
          partnerSubCaste,
          partnerQualification,
          partnerOccupation,
          partnerAnnualIncome,
          mangalik,
          partnerMaritalStatus,
          goAbroad,
          disability,
          disabilityPercentage,
          about,
        };

        matrimony.getByEmail(email, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
          } else {
            matrimony.create(newUser, (err, results) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }
              res.status(200).json({ message: "User registered successfully" });
            });
          }
        });
      });
    },
  ],
  login: (req, res) => {
    const { email, password } = req.body;

    matrimony.getByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "User does not exist" });
      }

      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
          { id: results[0].id, type: "Matrimony" },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({
          user: { token, type: "Matrimony", id: results[0].id },
          message: "Matrimony Login Successful!",
        });
      });
    });
  },
  update: (req, res) => {
    const id = req.user.id;

    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      timeOfBirth,
      placeOfBirth,
      community,
      religion,
      caste,
      subCaste,
      motherTongue,
      country,
      state,
      city,
      address,
      pincode,
      maritalStatus,
      haveChildren,
      noOfChildren,
      height,
      weight,
      complexion,
      bodyType,
      bloodGroup,
      donateBlood,
      qualification,
      educationSpecialization,
      currentLocation,
      immigrationStatus,
      designation,
      designationDetails,
      annualIncome,
      fatherName,
      fatherOccupation,
      fatherMobile,
      motherName,
      motherOccupation,
      motherMobile,
      grandfatherName,
      grandmotherName,
      nanaName,
      naniName,
      noOfBrothers,
      noOfSisters,
      believeInHoroscope,
      rashi,
      gotra,
      varna,
      mangalShani,
      diet,
      smoke,
      drink,
      hobbies,
      ageGap,
      partnerReligion,
      partnerCaste,
      partnerSubCaste,
      partnerQualification,
      partnerOccupation,
      partnerAnnualIncome,
      mangalik,
      partnerMaritalStatus,
      goAbroad,
      disability,
      disabilityPercentage,
      about,
    } = req.body;

    const updateDetails = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
      timeOfBirth,
      placeOfBirth,
      community,
      religion,
      caste,
      subCaste,
      motherTongue,
      country,
      state,
      city,
      address,
      pincode,
      maritalStatus,
      haveChildren,
      noOfChildren,
      height,
      weight,
      complexion,
      bodyType,
      bloodGroup,
      donateBlood,
      qualification,
      educationSpecialization,
      currentLocation,
      immigrationStatus,
      designation,
      designationDetails,
      annualIncome,
      fatherName,
      fatherOccupation,
      fatherMobile,
      motherName,
      motherOccupation,
      motherMobile,
      grandfatherName,
      grandmotherName,
      nanaName,
      naniName,
      noOfBrothers,
      noOfSisters,
      believeInHoroscope,
      rashi,
      gotra,
      varna,
      mangalShani,
      diet,
      smoke,
      drink,
      hobbies,
      ageGap,
      partnerReligion,
      partnerCaste,
      partnerSubCaste,
      partnerQualification,
      partnerOccupation,
      partnerAnnualIncome,
      mangalik,
      partnerMaritalStatus,
      goAbroad,
      disability,
      disabilityPercentage,
      about,
    };

    matrimony.update(id, updateDetails, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
        return;
      }

      res.status(200).json({ message: "Profile updated successfully" });
    });
  },
  search: (req, res) => {
    const search = req.params.search;
    const id = req.user.id;

    matrimony.search(id, search, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      results.forEach((result) => {
        result.profilePictures = result.profilePictures.split(",");
        result.password = undefined;
      });

      res.status(200).json(results);
    });
  },
};

module.exports = matrimonyController;
