//STYLES
import "./index.scss";

//ASSETS
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

// @ts-ignore
//PACKAGE
import React, {
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

//CMP
import BaseButton from "../../Components/Button";
import BaseInput from "../../Components/Input";
import BaseCard from "../../Components/Card";

//API
import {
  addTopCommentInOneVideo,
  editTopCommentInOneVideo,
  getChannelIdByMe,
  getCommentListInOneVideo,
  getTokenForComment,
  removeCommentInOneVideo,
} from "./action";

export default function CommentsPage() {
  const [isQueryList, setIsQueryList] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [videoIdInput, setVideoIdInput] = useState("");
  const [isFocusComment, setIsFocusComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [channelId, setChannelId] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [isReq, setIsReq] = useState("");
  const deferredVideoIdInput = useDeferredValue(videoIdInput);
  const isStaleVideoIdInput = videoIdInput !== deferredVideoIdInput;

  useEffect(() => {
    //get another token
    getTokenForComment();
  }, []);

  useMemo(() => {
    !isFocusComment && setNewComment("");
  }, [isFocusComment]);

  const getInputValue = (val) => {
    setUpdatedComment(val);
  };
  const handleFocusComment = () => {
    setIsFocusComment(true);
  };
  const handleCancelComment = () => {
    setIsFocusComment(false);
    setSelectedCommentId("");
  };

  const btnActionClassname = useMemo(() => {
    return isReq !== "" ? "hidden action-btn" : "action-btn";
  }, [isReq]);
  const handleUpdateBtn = (item) => {
    setIsReq("update-comment");
    setSelectedCommentId(
      // @ts-ignore
      item.id
    );
  };

  const handleDeleteBtn = (item) => {
    setIsReq("delete-comment");
    setSelectedCommentId(
      // @ts-ignore
      item.id
    );
  };

  const handleGetCommentList = async () => {
    setIsQueryList(true);
    if (deferredVideoIdInput) {
      const commentListRes = await getCommentListInOneVideo(
        deferredVideoIdInput
      );
      const myChannelRes = await getChannelIdByMe();
      if (myChannelRes && myChannelRes.statusCode === 200) {
        setChannelId(myChannelRes.data.items[0]?.id || "");
      }

      if (commentListRes && commentListRes.statusCode === 200) {
        console.log("RESPONSE LIST", commentListRes.data)
        const commentList = commentListRes.data.items?.map((item) => {
          const channelId = item.snippet.topLevelComment.snippet.authorChannelId?.value || "";
          const snippet = item.snippet.topLevelComment.snippet;
          return {
            id: item.id,
            authorName: snippet.authorDisplayName || "Author",
            authorAvatar: snippet.authorProfileImageUrl || "",
            text: snippet.textDisplay,
            channelId,
          };
        });
        setCommentList(commentList);
      }
    }
  };
  const handleNewComment = async () => {
    // const tokenFor
    const payload = {
      textOriginal: newComment,
      channelId,
      videoId: videoIdInput,
    };
    const isNotEmpty = Object.values(payload).every((x) => x !== "");
    if (isNotEmpty) {
      //call api to add new comment
      // @ts-ignore
      await addTopCommentInOneVideo(payload);
      setNewComment("");
    }
  };
  const updateCurrentComment = async (id) => {
    setIsReq("");
    const payload = {
      textOriginal: updatedComment,
      id,
    };
    const isNotEmpty = Object.values(payload).every((x) => x !== "");
    if (isNotEmpty) {
      //call api to add new comment
      await editTopCommentInOneVideo(payload);
    }
  };
  const deleteCurrentComment = async (id) => {
    setIsReq("");
    const payload = {
      id,
    };
    if (id) {
      const res = await removeCommentInOneVideo(payload);
      if (res === null || res === "") {
        // @ts-ignore
        setCommentList((state) => {
          // @ts-ignore
          const updateList = state.filter((item) => item.id !== id);
          return updateList;
        });
      }
    }
  };

  return (
    <div className="comments-page" style={{ textAlign: "left" }}>
      <h2>COMMENTS</h2>
      <p>Some Example Video Ids</p>
      <ul>
        <li>pshfwuFWUhU</li>
        <li>roxC8SMs7HU</li>
        <li>V__8y5qx4Wg</li>
      </ul>
      <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
        Or you can find it on YouTube. In a video link, for example:
        https://www.youtube.com/watch?v=IgKWPdJWuBQ. The ending characters is
        IgKWPdJWuBQ. Please use it for your desired video id.{" "}
      </p>
      <div style={{ marginBottom: "1rem" }}>
        <BaseInput
          placeholder="Video Id"
          value={videoIdInput}
          onChange={(val) => setVideoIdInput(val.target.value)}
        />
        <BaseButton
          disabled={videoIdInput !== "" ? false : true}
          // className={videoIdInput !== "" ? "" : "disabled"}
          onClick={() => handleGetCommentList()}
        >
          Get Comment List
        </BaseButton>
      </div>
      <div className="add-comment">
        <BaseInput
          placeholder="Add comment"
          value={newComment}
          onFocus={() => handleFocusComment()}
          onChange={(val) => setNewComment(val.target.value)}
        />
        <div
          className={
            isFocusComment ? "visible btn-container" : "hidden btn-container"
          }
        >
          <BaseButton onClick={() => handleCancelComment()}>Cancel</BaseButton>
          <BaseButton
            disabled={newComment !== "" ? false : true}
            onClick={handleNewComment}
          >
            Comment
          </BaseButton>
        </div>
      </div>
      {isQueryList && commentList?.length === 0 ? (
        <p>No comment for this video</p>
      ) : (
        <Suspense fallback={<h2>Loading...</h2>}>
          <div
            className="comment-list"
            style={{
              opacity: isStaleVideoIdInput ? 0.5 : 1,
              transition: isStaleVideoIdInput
                ? "opacity 0.2s 0.2s linear"
                : "opacity 0s 0s linear",
            }}
          >
            <ul>
              {commentList?.map((item) => {
                return (
                  <div className="card-container">
                    <BaseCard
                      key={
                        // @ts-ignore
                        item.id
                      }
                      getInputValue={getInputValue}
                      // @ts-ignore
                      id={item.id}
                      // @ts-ignore
                      selectedCommentId={selectedCommentId}
                      // @ts-ignore
                      title={item.text}
                      // @ts-ignore
                      subtitle={item.authorName}
                      // @ts-ignore
                      image={item.authorAvatar}
                    />
                    {
                      //@ts-ignore
                      item.channelId === channelId && (
                        <div className={btnActionClassname}>
                          <BaseButton
                            onClick={() => {
                              handleUpdateBtn(item);
                            }}
                          >
                            <EditIcon />
                          </BaseButton>
                          <BaseButton
                            onClick={() => {
                              handleDeleteBtn(item);
                            }}
                          >
                            <DeleteIcon />
                          </BaseButton>
                        </div>
                      )
                    }
                    {isReq === "update-comment" &&
                      selectedCommentId ===
                        // @ts-ignore
                        item.id && (
                        <div className="action-btn confirm">
                          <BaseButton onClick={() => setIsReq("")}>
                            Cancel
                          </BaseButton>
                          <BaseButton
                            onClick={() =>
                              updateCurrentComment(
                                // @ts-ignore
                                item.id
                              )
                            }
                          >
                            Ok
                          </BaseButton>
                        </div>
                      )}
                    {isReq === "delete-comment" &&
                      selectedCommentId ===
                        // @ts-ignore
                        item.id && (
                        <div className="action-btn confirm">
                          <BaseButton onClick={() => setIsReq("")}>
                            Cancel
                          </BaseButton>
                          <BaseButton
                            onClick={() =>
                              deleteCurrentComment(
                                // @ts-ignore
                                item.id
                              )
                            }
                          >
                            Ok
                          </BaseButton>
                        </div>
                      )}
                  </div>
                );
              })}
            </ul>
          </div>
        </Suspense>
      )}
    </div>
  );
}
