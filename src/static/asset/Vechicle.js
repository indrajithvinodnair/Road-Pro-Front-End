export const VechicleRegistrationContent = {
  inputs: [
    {
      name: "plateNumber",
      type: "text",
      label: "Plate Number",
      placeholder: "KL 37 A 2425",
    },
    {
      name: "engineNumber",
      type: "text",
      label: "Engine Number",
      placeholder: "6 digit number",
    },
    {
      name: "regDate",
      type: "date",
      label: "Registration Date",
      placeholder: "dd/mm/yyyy",
    },
    {
      name: "manDate",
      type: "date",
      label: "Manufactured Date",
      placeholder: "dd/mm/yyyy",
    },
    {
      name: "chasisNumber",
      type: "text",
      label: "Chassis Number",
      placeholder: "17 digit number",
    },
    {
      name: "modelName",
      type: "text",
      label: "Model Name",
      placeholder: "Toyota Camry",
    },
    {
      name: "seatingCapacity",
      type: "number",
      label: "Seating Capacity",
      placeholder: "4",
    },
    {
      name: "standingCapacity",
      type: "number",
      label: "Standing Capacity",
      placeholder: "0",
    },
    {
      name: "cyclinderCount",
      type: "number",
      label: "Cyclinder Count",
      placeholder: "2",
    },
    {
      name: "color",
      type: "text",
      label: "Primary Color",
      placeholder: "orange-red",
    },
    {
      name: "vehicleCost",
      type: "text",
      label: "Vechicle Cost",
      placeholder: "INR",
    },
  ],

  FOption: [
    {
      name: "Petrol",
    },
    {
      name: "Diesel",
    },
    {
      name: "P and D",
    },
    {
      name: "Electric",
    },
  ],

  EOption: [
    {
      name: "Bharat Stage I",
    },
    {
      name: "Bharat Stage II",
    },
    {
      name: "Bharat Stage III",
    },
    {
      name: "Bharat Stage IV",
    },
    {
      name: "Bharat Stage V",
    },
    {
      name: "Bharat Stage VI",
    },
  ],
};

export const UserVehicleUpdateContent = {
  inputs: [
    {
      name: "plateNumber",
      type: "text",
      label: "Plate Number",
      placeholder: "KL 37 A 2425",
    },
    {
      name: "engineNumber",
      type: "text",
      label: "Engine Number",
      placeholder: "6 digit number",
    },
    {
      name: "regDate",
      type: "date",
      label: "Registration Date",
      placeholder: "dd/mm/yyyy",
    },
    {
      name: "seatingCapacity",
      type: "number",
      label: "Seating Capacity",
      placeholder: "4",
    },
    {
      name: "cyclinderCount",
      type: "number",
      label: "Cyclinder Count",
      placeholder: "2",
    },
    {
      name: "color",
      type: "text",
      label: "Primary Color",
      placeholder: "orange-red",
    },
  ],
};

// simple array

export const ViewVehicleDetails = [
  {
    label: "Vehicle Model",
    name: "modelName",
    status : "active",
  },
  {
    label: "Plate No",
    name: "plateNumber",
  },
  {
    label: "Engine No",
    name: "engineNumber",
  },
  {
    label: "Chassis No",
    name: "chasisNumber",
  },
  {
    label: "Category",
    name: "vechicleCategory",
  },
  {
    label: "Sub-Category",
    name: "subCategory",
  },
  {
    label: "Seat No",
    name: "seatingCapacity",
  },
  {
    label: "Emission",
    name: "emissionCategory",
  },
  {
    label: "Color",
    name: "color",
  },
  {
    label: "Fuel",
    name: "fuelType",
  },
];



export const OfficalOwnerDetails = [
  {
    label: "Owned Organization",
    name: "ownership",
  },
  {
    label: "Vehicle Purpose",
    name: "vehicleUsage",
  },
];

export const RegisterdOwnerDetails = [
  {
    label: "First Name",
    name: "firstName",
  },
  {
    label: "Last Name",
    name: "lastName",
  },
  {
    label: "Aadhar No",
    name: "aadharNo",
  },
  {
    label: "M/F",
    name: "gender",
  },
  {
    label: "Address",
    name: "address",
  },
  {
    label: "PIN",
    name: "pinCode",
  },
  {
    label: "State",
    name: "state",
  },
];
