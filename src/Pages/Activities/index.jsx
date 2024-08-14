//STYLES
import "./index.scss";

//PACKAGE
import React, { useEffect, useState } from "react";

//CMP
import BaseButton from "../../Components/Button/index";
import BaseCard from "../../Components/Card";

//API
import { getActivityReport } from "./action";

//FUNC
import { handleCallGoogleToken } from "../../utils/common";
import LocalStorageUtils from "../../utils/localStorage.util";

export default function ActivitiesPage() {
  const [activityList, setActivityList] = useState([]);
  const [isReq, setIsReq] = useState(false);

  const handleClick = async () => {
    setIsReq(true);
    const res = await getActivityReport();
    const videoItems = res?.items?.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      image: item.snippet.thumbnails.default.url,
    }));
    videoItems?.length !== 0 && LocalStorageUtils.saveActivityList(videoItems);
    setActivityList(videoItems);
  };

  useEffect(() => {
    setIsReq(false);
    const ggToken = LocalStorageUtils.getGoogleAccessToken();
    if (ggToken === ''){
      handleCallGoogleToken();
    } 
    const list = LocalStorageUtils.getActivityList();
    //@ts-ignore
    list && Array.isArray(list) && setActivityList(list);
  }, []);

  return (
    <div className="activity-page" style={{ textAlign: "left" }}>
      <BaseButton onClick={() => handleClick()}>
        Get Activitites Report
      </BaseButton>
      {isReq && activityList?.length === 0 && <p>No video has been uploaded</p>}
      <ul className="list">
        {activityList?.length !== 0 &&
          activityList?.map((item) => (
            <BaseCard
            isDisabledInput={true}
              //@ts-ignore
              key={item.id}
              // @ts-ignore
              title={item.title}
              // @ts-ignore
              subtitle={item.description}
              // @ts-ignore
              image={item.image}
            />
          ))}
      </ul>
    </div>
  );
}
