import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Flex, GradientText, Image } from "@/components";
import { Follower, useContextFollower } from "@/contexts";
// assets

const FollowingItem = ({
  index,
  src,
  name,
  onUnFollow
}: {
  index: number;
  src: string;
  name: string;
  isfollow: boolean;
  onUnFollow: (name: string) => void;
}) => {
  return (
    <Flex
      align="items-center"
      justifyContent="justify-between"
      className={clsx(
        "px-5 py-2 space-x-2 bg-black/40 rounded-2xl cursor-pointer hover:bg-main-100",
        "tablet:flex-col tablet:space-y-3 tablet:space-x-0 tablet:p-0 tablet:pb-5 tablet:overflow-clip",
        "mobile:w-[80%]"
      )}
    >
      <Flex align="items-center" className={clsx("space-x-5 tablet:space-x-0 tablet:w-full")}>
        <Flex justifyContent="justify-center" align="items-center" className="tablet:hidden">
          <div className="w-5 h-5 rounded-full bg-main-200 text-main-900 text-[16px] inline-flex items-center justify-center">
            {index}
          </div>
        </Flex>
        <Flex
          align="items-center"
          className={clsx("space-x-4", "tablet:flex-col tablet:space-x-0 tablet:w-full tablet:space-y-3")}
        >
          <Image
            src={src}
            alt={name}
            fill
            className={clsx(
              "w-[62px] h-[62px] shrink-0 rounded-full",
              "tablet:rounded-none tablet:w-full tablet:h-[200px] object-cover"
            )}
          />
          <p className={clsx("text-[22px] small:text-[16px] font-500 break-all", "tablet:text-center tablet:px-10")}>
            {name}.zeta
          </p>
        </Flex>
      </Flex>
      <button
        onClick={() => onUnFollow(name)}
        className={clsx("rounded-3xl inline-flex items-center justify-center p-3", "w-[113px] border border-primary")}
      >
        <span className="text-[12px] text-primary">{"Unfollow"}</span>
      </button>
    </Flex>
  );
};

const FollowingView: React.FC = () => {
  const { follower, setFollower } = useContextFollower();
  const [items, setItems] = useState<Follower[]>([]);

  useEffect(() => {
    setItems(follower.filter((item: Follower) => item.isfollow));
  }, [follower]);

  const onUnFollow = (name: string) => {
    const updatedFollowers = follower.map((follower) => {
      if (follower.name === name) {
        return { ...follower, isfollow: false };
      }
      return follower;
    });

    console.log("updateFollowers", updatedFollowers);

    setFollower(updatedFollowers);
  };

  return (
    <div className="w-full">
      <div className="text-[32px] font-500 font-space_grotesk mobile:text-[28px] mobile:text-center pb-2">
        <GradientText>Following</GradientText>
      </div>

      <div
        className={clsx(
          "flex-col space-y-3",
          "tablet:grid tablet:grid-cols-2 tablet:space-y-0 tablet:gap-4",
          "mobile:grid-cols-1 mobile:place-items-center"
        )}
      >
        {items.length !== 0 &&
          items.map((item, index) => (
            <FollowingItem key={`follower-item-${index}`} index={index + 1} {...item} onUnFollow={onUnFollow} />
          ))}
      </div>
    </div>
  );
};

export default FollowingView;
