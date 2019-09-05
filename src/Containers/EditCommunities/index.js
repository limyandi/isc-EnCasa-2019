import React, { useGlobal } from 'reactn';
import { MyDropdown } from '../../Components';
import { Community } from '../../utils/http';

const EditCommunities = props => {
  const [communities, setCommunities] = React.useState(undefined);
  const { onChange, value } = props;

  React.useEffect(() => {
    Community.getCommunities().then(res => {
      setCommunities(res.data);
    });
  }, [setCommunities]);

  return (
    <div>
      <div>Edit Communities</div>
      {communities && (
        <MyDropdown
          light
          value={value}
          onChange={onChange}
          valueLists={communities.communities}
        />
      )}
    </div>
  );
};

export default EditCommunities;
