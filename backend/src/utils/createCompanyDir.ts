// create a function that will create a directory for the company in the format static/${companyDirectory}/${dataFileTypeDirectory}/${dataGroupDirectory}/${dataFileName}
import fs from "fs";
import path from "path";
export const createCompanyDir = async (
  companyDirectory: string,
  dataGroupDirectory?: string | undefined,
  dataFileName?: string | undefined
) => {
  try {
    // create the directory if it does not exist
    if (!fs.existsSync(`static/${companyDirectory}`)) {
      fs.mkdirSync(`static/${companyDirectory}`);
    }

   
    if (
      !fs.existsSync(
        path.join(
          "../",
          `static/${companyDirectory}/${dataGroupDirectory}`
        )
      ) &&
      dataGroupDirectory
    ) {
      fs.mkdirSync(
        path.join(
          "../",
          `static/${companyDirectory}/${dataGroupDirectory}`
        )
      );
    }
    if (
      !fs.existsSync(
        path.join(
          "../",
          `static/${companyDirectory}/${dataGroupDirectory}/${dataFileName}`
        )
      ) &&
      dataFileName
    ) {
      fs.mkdirSync(
        path.join(
          "../",
          `static/${companyDirectory}/${dataGroupDirectory}/${dataFileName}`
        )
      );
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  return  true;
};
