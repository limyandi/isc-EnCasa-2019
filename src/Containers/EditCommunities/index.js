import React, { useGlobal } from 'reactn';
import { MyDropdown } from '../../Components';
import { Community } from '../../utils/http';

function EditCommunities() {
  const [user, setUser] = useGlobal('user');
  const [communities, setCommunities] = React.useState(undefined);
  const [selectedCommunities, setSelectedCommunities] = React.useState(
    user.communities
  );

  React.useEffect(() => {
    Community.getCommunities().then(res => {
      setCommunities(res.data);
    });
  }, [setCommunities]);

  function handleSelectedCommunities(event) {
    console.log(event.target.value);
    setSelectedCommunities(event.target.value);
  }

  return (
    <div>
      <div>Edit Communities</div>
      {communities && (
        <MyDropdown
          value={selectedCommunities}
          onChange={handleSelectedCommunities}
          valueLists={communities.communities}
        />
      )}
      <div>Notification Settings</div>
    </div>
  );
}

export default EditCommunities;
