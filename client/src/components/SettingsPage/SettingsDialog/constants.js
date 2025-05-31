import { AddEditDepartment } from "./dialogs/AddEditDepartment";
import { AddEditJobTitle } from "./dialogs/AddEditJobTitle";
import { AddEditTimeOffPolicy } from "./dialogs/AddEditTimeOffPolicy";
import { DeleteDepartment } from "./dialogs/DeleteDepartment";
import { DeleteJobTitle } from "./dialogs/DeleteJobTitle";
import { DeleteTimeOffPolicy } from "./dialogs/DeleteTimeOffPolicy";

export const tabNames = {
  departments: "departments",
  jobtitles: "jobtitles",
  timeoffs: "timeoffs",
  permissions: "permissions",
};

export const dialogTitle = {
  add: {
    [tabNames.departments]: "Добавить новый отдел",
    [tabNames.jobtitles]: "Добавить новую должность",
    [tabNames.timeoffs]: "Добавить политику",
  },
  edit: {
    [tabNames.departments]: "Переименовать отдел",
    [tabNames.jobtitles]: "Переименовать должность",
    [tabNames.timeoffs]: "Редактировать политику",
  },
  delete: {
    [tabNames.departments]: "Куда перенести затронутых сотрудников?",
    [tabNames.jobtitles]: "Куда перенести затронутых сотрудников?",
    [tabNames.timeoffs]: "Переназначить всех сотрудников на другую политику",
  },
};

export const dialogContent = {
  add: {
    [tabNames.departments]: AddEditDepartment,
    [tabNames.jobtitles]: AddEditJobTitle,
    [tabNames.timeoffs]: AddEditTimeOffPolicy,
  },
  edit: {
    [tabNames.departments]: AddEditDepartment,
    [tabNames.jobtitles]: AddEditJobTitle,
    [tabNames.timeoffs]: AddEditTimeOffPolicy,
  },
  delete: {
    [tabNames.departments]: DeleteDepartment,
    [tabNames.jobtitles]: DeleteJobTitle,
    [tabNames.timeoffs]: DeleteTimeOffPolicy,
  },
};
