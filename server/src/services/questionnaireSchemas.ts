export const questionnaireSchemas: Record<string, any> = {
    rti: {
        title: "RTI Application",
        description: "Right to Information Act, 2005",
        sections: [
            {
                title: "Public Authority Details",
                questions: [
                    {
                        id: "authority_name",
                        type: "text",
                        label: "Name of Public Authority",
                        placeholder: "e.g., Municipal Corporation of Delhi",
                        required: true
                    },
                    {
                        id: "department",
                        type: "text",
                        label: "Department (if specific)",
                        placeholder: "e.g., Public Works Department",
                        required: false
                    },
                    {
                        id: "authority_address",
                        type: "textarea",
                        label: "Address of Authority",
                        placeholder: "Full address",
                        required: true
                    }
                ]
            },
            {
                title: "Information Sought",
                questions: [
                    {
                        id: "information_details",
                        type: "textarea",
                        label: "What information do you seek?",
                        placeholder: "Describe the information you want in detail...",
                        required: true,
                        rows: 6
                    },
                    {
                        id: "time_period",
                        type: "text",
                        label: "Time period of information",
                        placeholder: "e.g., January 2023 to December 2023",
                        required: false
                    },
                    {
                        id: "reason",
                        type: "textarea",
                        label: "Reason/Purpose for seeking information",
                        placeholder: "Optional but recommended...",
                        required: false,
                        rows: 3
                    }
                ]
            },
            {
                title: "Fee Payment",
                questions: [
                    {
                        id: "payment_mode",
                        type: "select",
                        label: "Mode of payment",
                        options: [
                            "Cash",
                            "Demand Draft",
                            "Indian Postal Order",
                            "Online Payment",
                            "Other"
                        ],
                        required: true
                    }
                ]
            }
        ]
    },

    consumer: {
        title: "Consumer Complaint",
        description: "Consumer Protection Act, 2019",
        sections: [
            {
                title: "Seller/Service Provider Details",
                questions: [
                    {
                        id: "opposite_party_name",
                        type: "text",
                        label: "Name of Seller/Company",
                        placeholder: "Full name of the seller/company",
                        required: true
                    },
                    {
                        id: "opposite_party_address",
                        type: "textarea",
                        label: "Address of Seller/Company",
                        placeholder: "Complete address",
                        required: true
                    },
                    {
                        id: "gstin",
                        type: "text",
                        label: "GSTIN (if available)",
                        placeholder: "GST Identification Number",
                        required: false
                    }
                ]
            },
            {
                title: "Product/Service Details",
                questions: [
                    {
                        id: "product_service",
                        type: "text",
                        label: "Product/Service Name",
                        placeholder: "Name of product or service",
                        required: true
                    },
                    {
                        id: "purchase_date",
                        type: "date",
                        label: "Date of Purchase/Service",
                        required: true
                    },
                    {
                        id: "amount_paid",
                        type: "number",
                        label: "Amount Paid (₹)",
                        placeholder: "0",
                        required: true
                    },
                    {
                        id: "bill_number",
                        type: "text",
                        label: "Invoice/Bill Number",
                        placeholder: "Receipt number",
                        required: false
                    }
                ]
            },
            {
                title: "Complaint Details",
                questions: [
                    {
                        id: "defect_deficiency",
                        type: "textarea",
                        label: "Describe the defect/deficiency",
                        placeholder: "Explain the problem in detail...",
                        required: true,
                        rows: 6
                    },
                    {
                        id: "issue_date",
                        type: "date",
                        label: "When did the issue occur?",
                        required: true
                    },
                    {
                        id: "attempts_to_resolve",
                        type: "textarea",
                        label: "Attempts made to resolve the issue",
                        placeholder: "Describe any communication with seller...",
                        required: false,
                        rows: 4
                    },
                    {
                        id: "compensation_sought",
                        type: "textarea",
                        label: "Compensation/Relief Sought",
                        placeholder: "What resolution do you want?",
                        required: true,
                        rows: 4
                    }
                ]
            }
        ]
    },

    grievance: {
        title: "Grievance Petition",
        description: "Complaint to Government Authority",
        sections: [
            {
                title: "Authority Details",
                questions: [
                    {
                        id: "authority",
                        type: "text",
                        label: "Name of Authority/Department",
                        placeholder: "e.g., District Collector",
                        required: true
                    },
                    {
                        id: "authority_address",
                        type: "textarea",
                        label: "Address",
                        required: true
                    }
                ]
            },
            {
                title: "Grievance Details",
                questions: [
                    {
                        id: "subject",
                        type: "text",
                        label: "Subject of Grievance",
                        placeholder: "Brief subject line",
                        required: true
                    },
                    {
                        id: "grievance_description",
                        type: "textarea",
                        label: "Detailed Description of Grievance",
                        placeholder: "Explain your issue in detail...",
                        required: true,
                        rows: 8
                    },
                    {
                        id: "incident_date",
                        type: "date",
                        label: "Date of Incident/Issue",
                        required: false
                    },
                    {
                        id: "location",
                        type: "text",
                        label: "Location (if applicable)",
                        placeholder: "Where did this occur?",
                        required: false
                    },
                    {
                        id: "previous_complaints",
                        type: "textarea",
                        label: "Previous Complaints (if any)",
                        placeholder: "Reference numbers, dates...",
                        required: false,
                        rows: 3
                    },
                    {
                        id: "relief_sought",
                        type: "textarea",
                        label: "Relief/Action Sought",
                        placeholder: "What do you want the authority to do?",
                        required: true,
                        rows: 4
                    }
                ]
            }
        ]
    },
    pil: {
        title: "Public Interest Litigation",
        description: "PIL Petition",
        sections: [
            {
                title: "Court Details",
                questions: [
                    {
                        id: "court",
                        type: "select",
                        label: "Select Court",
                        options: [
                            "Supreme Court of India",
                            "High Court - Delhi",
                            "High Court - Mumbai",
                            "High Court - Kolkata",
                            "High Court - Chennai",
                            "Other High Court"
                        ],
                        required: true
                    }
                ]
            },
            {
                title: "Public Interest Matter",
                questions: [
                    {
                        id: "public_issue",
                        type: "textarea",
                        label: "Describe the public interest issue",
                        placeholder: "What public interest is at stake?",
                        required: true,
                        rows: 6
                    },
                    {
                        id: "affected_population",
                        type: "textarea",
                        label: "Population affected",
                        placeholder: "Who is affected and how?",
                        required: true,
                        rows: 4
                    },
                    {
                        id: "constitutional_violation",
                        type: "textarea",
                        label: "Constitutional/Legal violations (if any)",
                        placeholder: "Which fundamental rights or laws are violated?",
                        required: false,
                        rows: 4
                    },
                    {
                        id: "relief_sought",
                        type: "textarea",
                        label: "Relief Sought",
                        placeholder: "What orders do you seek from the court?",
                        required: true,
                        rows: 4
                    }
                ]
            }
        ]
    },
    municipal: {
        title: "Municipal Complaint",
        description: "Local Body Complaint",
        sections: [
            {
                title: "Municipal Authority",
                questions: [
                    {
                        id: "municipality",
                        type: "text",
                        label: "Name of Municipal Corporation/Council",
                        placeholder: "e.g., Bangalore Municipal Corporation",
                        required: true
                    },
                    {
                        id: "ward",
                        type: "text",
                        label: "Ward Number/Name",
                        required: false
                    }
                ]
            },
            {
                title: "Complaint Details",
                questions: [
                    {
                        id: "issue_type",
                        type: "select",
                        label: "Type of Issue",
                        options: [
                            "Road Repair",
                            "Drainage/Sewage",
                            "Water Supply",
                            "Garbage Collection",
                            "Street Lights",
                            "Encroachment",
                            "Building Violation",
                            "Other"
                        ],
                        required: true
                    },
                    {
                        id: "location",
                        type: "textarea",
                        label: "Exact Location",
                        placeholder: "Complete address with landmarks",
                        required: true,
                        rows: 3
                    },
                    {
                        id: "problem_description",
                        type: "textarea",
                        label: "Description of Problem",
                        placeholder: "Describe the civic issue in detail...",
                        required: true,
                        rows: 6
                    },
                    {
                        id: "duration",
                        type: "text",
                        label: "How long has this been an issue?",
                        placeholder: "e.g., 6 months",
                        required: false
                    },
                    {
                        id: "urgency",
                        type: "select",
                        label: "Urgency Level",
                        options: ["Low", "Medium", "High", "Critical"],
                        required: true
                    },
                    {
                        id: "action_requested",
                        type: "textarea",
                        label: "Action Requested",
                        placeholder: "What should the municipality do?",
                        required: true,
                        rows: 3
                    }
                ]
            }
        ]
    },
    writ: {
        title: "Write Petition",
        description: "Constitutional Remedy",
        sections: [
            {
                title: "Court Details",
                questions: [
                    {
                        id: "high_court",
                        type: "select",
                        label: "High Court",
                        options: [
                            "Delhi High Court",
                            "Bombay High Court",
                            "Calcutta High Court",
                            "Madras High Court",
                            "Karnataka High Court",
                            "Other"
                        ],
                        required: true
                    }
                ]
            },
            {
                title: "Writ Details",
                questions: [
                    {
                        id: "writ_type",
                        type: "select",
                        label: "Type of Writ",
                        options: [
                            "Habeas Corpus",
                            "Mandamus",
                            "Prohibition",
                            "Certiorari",
                            "Quo Warranto"
                        ],
                        required: true
                    },
                    {
                        id: "respondent",
                        type: "textarea",
                        label: "Respondent Details",
                        placeholder: "Against whom the writ is filed",
                        required: true,
                        rows: 3
                    },
                    {
                        id: "fundamental_right",
                        type: "textarea",
                        label: "Fundamental Right Violated",
                        placeholder: "Which Article of Constitution?",
                        required: true,
                        rows: 3
                    },
                    {
                        id: "facts",
                        type: "textarea",
                        label: "Facts of the Case",
                        placeholder: "Detailed facts...",
                        required: true,
                        rows: 8
                    },
                    {
                        id: "relief",
                        type: "textarea",
                        label: "Relief Sought",
                        placeholder: "What orders do you seek?",
                        required: true,
                        rows: 4
                    }
                ]
            }
        ]
    }
};
