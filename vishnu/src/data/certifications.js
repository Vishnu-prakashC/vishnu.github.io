/**
 * Verified credentials data.
 * Certificate image: public/certificates/oracle_APEX.jpg
 */

export const certifications = [
  {
    id: "oracle-apex",
    title: "Oracle APEX Cloud Developer Certified Professional",
    issuer: "Oracle University",
    description: "Completed Oracle APEX Cloud Developer certification successfully",
    date: "May 14, 2025",
    skills: ["Oracle APEX", "Cloud Development", "Professional Certification"],
    image: "/certificates/oracle_APEX.jpg",
    logo: "/certificates/Oracle%20LOGO.jpg",
    logoAlt: "Oracle Cloud logo",
    logoZoom: 1,
    verifyUrl: "https://education.oracle.com/",
    credentialId: "101639627APEX24CDOCP",
  },
  {
    id: "guvi-devops",
    title: "Mastering DevOps",
    issuer: "GUVI (in collaboration with HCL)",
    description: "Completed Mastering DevOps successfully",
    date: "March 27, 2026",
    skills: ["DevOps", "CI/CD", "Cloud", "Automation"],
    image: "/certificates/HCL%20GUVI%20Certification%20-%203oL4761fP6l5997N01%20%281%29.png",
    logo: "/certificates/guvi%20logo.png",
    logoAlt: "GUVI and HCL logo",
    logoZoom: 2.15,
    verifyUrl: "https://www.guvi.in/share-certificate/3oL4761fP6l5997N01",
    credentialId: "3oL4761fP6l5997N01",
  },
];

/** Certification shown on the minimal preview card. */
export const previewCertification = certifications[0];
