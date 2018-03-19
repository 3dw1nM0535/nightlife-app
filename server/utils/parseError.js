import _ from "lodash";

export const parseErrors = (errors) => {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });
};
