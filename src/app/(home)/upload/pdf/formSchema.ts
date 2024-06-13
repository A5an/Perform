import { z } from 'zod';

const addressSchema = z.object({
  streetNo: z.string().optional(),
  streetName: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional()
});

const contactInfoSchema = z.object({
  workPhone: z.string().optional(),
  mobilePhone: z.string().optional(),
  email: z.union([
    z.literal(''),
    z.string().email(),
  ]) 
});

const investigatorSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: addressSchema,
  contact: contactInfoSchema,
  hasDedicatedStudyCoordinator: z.boolean().optional().nullable(),
  studyCoordinator: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: addressSchema.optional(),
    contact: contactInfoSchema.optional()
  }).optional()
});

const clinicalSiteSchema = z.object({
  affiliatedHospital: z.string().optional(),
  affiliatedUniversity: z.string().optional(),
  otherSiteInvestigators: z.string().optional(),
  specialtyArea: z.string().optional(),
  isBoardCertified: z.boolean().optional().nullable(),
  boardCertificationSpecialties: z.string().optional(),
  hasGCPTraining: z.boolean().optional().nullable(),
  hasRegulatedTrialsExperience: z.boolean().optional().nullable(),
  clinicalTrialsParticipated: z.enum(["1", "2", "3", "4", "5+"]).optional().nullable(),
  isParticipatingInIndustryTrials: z.boolean().optional().nullable(),
  researchCoordinatorHasGCPTraining: z.boolean().optional().nullable(),
  studyCoordinatorRegulatedTrialsExperience: z.boolean().optional().nullable(),
  studyCoordinatorClinicalTrialsWorkedOn: z.enum(["1", "2", "3", "4", "5+"]).optional().nullable(),
  hasSOPs: z.boolean().optional().nullable(),
  patientMedicalRecordMaintenance: z.enum([
    "Maintain original paper patient medical record",
    "Maintain both paper and electronic patient medical record",
    "Maintain the entire patient medical record in a computerized system"
  ]).optional().nullable(),
  allowsMcMasterReview: z.boolean().optional().nullable(),
  allowsDeIdentifiedNotesSubmission: z.boolean().optional().nullable(),
  newPrimaryExtremitySarcomasTreatedYearly: z.enum(["<10", "10-19", "20-29", "30-39", "40+"]).optional().nullable(),
  postOpSurveillancePractice: z.enum(["Chest CT scan", "CXR", "Other"]).optional().nullable(),
  postOpSurveillanceOther: z.string().optional().optional().nullable(),
  imagingModalitiesAvailable: z.boolean().optional().nullable(),
  followUpFrequencyFirstTwoYears: z.enum(["Every 3 Months", "Every 6 Months", "Other"]).optional().nullable(),
  followUpFrequencyOther: z.string().optional()
});

const clinicalTrialQuestionsSchema = z.object({
  comfortableWithRandomization: z.boolean().optional().nullable(),
  logisticalChallenges: z.boolean().optional().nullable(),
  logisticalChallengesDetails: z.string().optional().nullable(),
  challengesWithDocumentingEvents: z.boolean().optional().nullable(),
  documentingEventsDetails: z.string().optional().nullable(),
  challengesWithAdministeringQuestionnaires: z.boolean().optional().nullable(),
  administeringQuestionnairesDetails: z.string().optional().nullable(),
  challengesWithFiveYearFollowUp: z.boolean().optional().nullable(),
  fiveYearFollowUpDetails: z.string().optional().nullable(),
  challengesWithDocumentingCosts: z.boolean().optional().nullable(),
  documentingCostsDetails: z.string().optional().nullable(),
  interestedInParticipating: z.boolean().optional().nullable(),
  additionalRelevantInformation: z.string().optional().nullable()
});

export const formSchema = z.object({
  investigator: investigatorSchema,
  clinicalSite: clinicalSiteSchema,
  clinicalTrialQuestions: clinicalTrialQuestionsSchema
});

export const defaultValues: z.infer<typeof formSchema> = {
  investigator: {
    firstName: "",
    lastName: "",
    address: {
      streetNo: "",
      streetName: "",
      postalCode: "",
      city: "",
      state: "",
      country: ""
    },
    contact: {
      workPhone: "",
      mobilePhone: "",
      email: ""
    },
    hasDedicatedStudyCoordinator: true,
    studyCoordinator: {
      firstName: "",
      lastName: "",
      address: {
        streetNo: "",
        streetName: "",
        postalCode: "",
        city: "",
        state: "",
        country: ""
      },
      contact: {
        workPhone: "",
        mobilePhone: "",
        email: ""
      }
    }
  },
  clinicalSite: {
    affiliatedHospital: "",
    affiliatedUniversity: "",
    otherSiteInvestigators: "",
    specialtyArea: "",
    isBoardCertified: null,
    boardCertificationSpecialties: "",
    hasGCPTraining: null,
    hasRegulatedTrialsExperience: null,
    clinicalTrialsParticipated: null,
    isParticipatingInIndustryTrials: null,
    researchCoordinatorHasGCPTraining: null,
    studyCoordinatorRegulatedTrialsExperience: null,
    studyCoordinatorClinicalTrialsWorkedOn: null,
    hasSOPs: null,
    patientMedicalRecordMaintenance: null,
    allowsMcMasterReview: null,
    allowsDeIdentifiedNotesSubmission: null,
    newPrimaryExtremitySarcomasTreatedYearly: null,
    postOpSurveillancePractice: null,
    postOpSurveillanceOther: "",
    imagingModalitiesAvailable: null,
    followUpFrequencyFirstTwoYears: null,
    followUpFrequencyOther: ""
  },
  clinicalTrialQuestions: {
    comfortableWithRandomization: null,
    logisticalChallenges: null,
    logisticalChallengesDetails: "",
    challengesWithDocumentingEvents: null,
    documentingEventsDetails: "",
    challengesWithAdministeringQuestionnaires: null,
    administeringQuestionnairesDetails: "",
    challengesWithFiveYearFollowUp: null,
    fiveYearFollowUpDetails: "",
    challengesWithDocumentingCosts: null,
    documentingCostsDetails: "",
    interestedInParticipating: null,
    additionalRelevantInformation: ""
  }
};
