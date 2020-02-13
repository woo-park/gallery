const initialPageState = {
  projectsLength: 0,
  projects: [],
}

export function page(state = initialPageState, action) {
  switch (action.type) {
	  case 'RECEIVE_ENTITIES': {
      const { projects } = action.payload;


	    return {
        ...state,
        projects: projects,
        projectsLength: projects.length,
	    }
	  }
    case 'COUNT_UP':
      console.log(state.projects)
      let { projects } = state;
      const { projectId } = action.payload;
      if (projects.length > 0) {

        const pushedProject = getProjectByProjectId(projects, projectId);   //dont even need this
        console.log(pushedProject)
        // projects = projects.filter(each => each.id != projectId);
        projects.forEach((each) => {if (each.id == projectId) { each.counts += 1}})   //changes inplace

        return {
          ...state,
          projectsLength: projects.length,
          projects: [...projects]
        }
      }

	  default: {
	    return state;
	  }
  }
}

function getProjectByProjectId(projects, projectId) {

  let matchingProject = projects.filter(each => each.id === projectId);
  console.log(matchingProject,'matchingProject')

  return matchingProject[0];
}
