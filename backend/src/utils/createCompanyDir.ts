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
    if (!fs.existsSync(`static/${companyDirectory}/`)) {
      // create the directory
      fs.mkdirSync(`./src/static/${companyDirectory}`, { recursive: true });
    }

    if (
      !fs.existsSync(
        path.join("./src/", `static/${companyDirectory}/${dataGroupDirectory}`)
      ) &&
      dataGroupDirectory
    ) {
      fs.mkdirSync(
        path.join("./src/", `static/${companyDirectory}/${dataGroupDirectory}`)
      );
    }
    if (
      dataFileName
    ) {
      // create the file
      fs.writeFileSync(
        path.join(
          "./src/",
          `static/${companyDirectory}/${dataGroupDirectory}/${dataFileName}`
        ),
        "1,2,3,4,5,6,7,8,9,10"

      );
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const createFileInCompanyDir = async (
  companyDirectory: string,
  dataGroupDirectory: string,
  dataFileName: string
) => {
  try {
    // create the directory if it does not exist
    if (!fs.existsSync( `static/${companyDirectory}/`)) {
      // create the directory
      fs.mkdirSync(`./src/static/${companyDirectory}`, { recursive: true });
    } 
    if (!fs.existsSync(path.join("./src/", `static/${companyDirectory}/${dataGroupDirectory}`))) {
      fs.mkdirSync(path.join("./src/", `static/${companyDirectory}/${dataGroupDirectory}`));
    }
    // create the file
    fs.writeFileSync(path.join("./src/", `static/${companyDirectory}/${dataGroupDirectory}/${dataFileName}`), "1,2,3,4,5,6,7,8,9,10");
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
