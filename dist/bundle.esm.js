const buildRelationships = resource => {
  return Object.entries(resource).reduce((newObject, [key, value]) => {
    if (value && Array.isArray(value)) {
      if (!newObject[key]) {
        newObject[key] = {data: []};
      }

      newObject[key].data = value.map(id => ({type: key, id}));
    }
    return newObject;
  }, {});
};

const updateResources = (mutator, resourceType, resourcesById) => {
  Object.entries(resourcesById).forEach(([id, resource]) => {
    if (!mutator[resourceType]) {
      mutator[resourceType] = {};
    }
    mutator[resourceType][id] = resource;
  });
};

const updateResource = (
  mutator,
  {id, type, attributes, links, relationships}
) => {
  if (!(type in mutator)) {
    mutator[type] = {};
  }

  mutator[type][id] = {
    type,
    id,
    attributes,
    links,
    relationships: relationships || buildRelationships(type, attributes)
  };
};

const removeResources = (mutator, resources) => {
  resources.forEach(({type, id}) => {
    delete mutator[type][id];
  });
};

const removeResource = (mutator, {id, type}) => {
  delete mutator[type][id];
};

const clearResources = (mutator, resourceTypes) => {
  resourceTypes.forEach(resourceType => {
    mutator[resourceType] = {};
  });
};

var actions = /*#__PURE__*/Object.freeze({
  updateResources: updateResources,
  updateResource: updateResource,
  removeResources: removeResources,
  removeResource: removeResource,
  clearResources: clearResources
});

var index = {actions};

export default index;
