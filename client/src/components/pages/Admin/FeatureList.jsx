import React from "react";
import PropType from "prop-types";

const FeatureList = ({ featureName }) => {
  console.log(featureName);
  return (
    <div>
      <h1>{featureName}</h1>
    </div>
  );
};

FeatureList.propTypes = {
  featureName: PropType.string.isRequired,
};

export default FeatureList;
