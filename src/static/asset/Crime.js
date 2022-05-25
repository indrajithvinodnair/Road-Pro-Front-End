export const UpdateContents = {
    inputs : [
        {
            label : 'Name',
            name : 'infraction_name',
            type : 'text'
        },
        {
            label : 'Type',
            name : 'punishment_type',
            type : 'text'
        },
        {
            label : 'Amount',
            name : 'punishment_amount',
            type : 'text'
        },
        
    ],
}

export const AddContents = {
    inputs : [
        {
            label:'Id',
            name:'infraction_id',
            type: 'text',
            placeholder: "1",
        },
        {
            label : 'Name',
            name : 'infraction_name',
            type : 'text',
            placeholder: "Speeding",
        },
        {
            label : 'Type',
            name : 'punishment_type',
            type : 'text',
            placeholder: "penality",

        },
        {
            label : 'Amount',
            name : 'punishment_amount',
            type : 'text',
            placeholder: "1000",
        },
        
    ],
}


export const trafficDetails = [
    {
        label : 'Aadhar No',
        name : 'Aadhar',
        type : "text",
        placeholder : "12 Digit aadhar",
    },
    {
        label : 'Infraction Id',
        name : 'infraction_id',
        type : "text",
        placeholder : "2",
    },
    {
        label : 'Date Issued',
        name : 'date_issued',
        type : "date",
        placeholder : "dd/mm/yyyy",
    }
]




export const accidentVehicleDetails = [
    {
        label : 'Plate Number',
        type : 'text',
        name : 'plateNo',
    },
    {
        label : 'Owner First Name',
        type : 'text',
        name : 'ownerFirst',
    },
    {
        label : 'Owner Last Name',
        type : 'text',
        name : 'ownerLast',
    },
    {
        label : 'Severity',
        type : 'text',
        name : 'damage'
    }

]


export const accidentinfoDetails = [
    {
        label : 'Case ID',
        name : 'accidentId',
    },
    {
        label: 'Plate Number',
        name : 'plateNumber'
    },
    {
        label : 'Date of Reg',
        name : 'date',
    },
    {
        label : 'Cause',
        name : 'cause',
    },
    {
        label : 'Place',
        name : 'place',
    },
    {
        label : 'Info',
        name : 'primaryInfo',
    },
    {
        label : 'Accident Type',
        name : 'accidentType',
    }
]
export const accidentDetails = [
    {
        label : 'Victim First Name',
        type : 'text',
        name : 'victimFirstName'
    }, 
    {
        label : 'Victim Last Name',
        type : 'text',
        name : 'victimLastName',
    },
    {
        label : 'Victim Age',
        type : 'number',
        name : 'victimAge'
    },
    {
        label : 'Severity',
        type : 'text',
        name : 'damage'
    }
]




export const TrafficCrimeContents = [
    {
        label : 'Date',
        name : 'date_issued',
        type: 'date',
        placeholder : 'dd/mm/yyyy',
    },
    {
        label : 'Aadhar',
        name : 'Aadhar',
        type: 'text',
        placeholder : '12 digit aadhar Number',
    },
    
]


export const theftInfoDetails = [
    {
        label : 'Case ID',
        name : 'crimeId',
    },
    {
        label : 'Date of Reg',
        name : 'reportDate',
    },
    {
        label : 'Juridsiction',
        name : 'jurisdiction',
    },
    {
        label : 'Type',
        name : 'vehicleAccess',
    },
    {
        label : 'Station',
        name : 'station',
    },
    {
        label : 'Case status',
        name : 'crimeStatus',
    }
]
