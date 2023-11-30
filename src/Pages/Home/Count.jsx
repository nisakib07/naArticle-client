import CountUp from "react-countup";
import useAllUsers from "../../hooks/useAllUsers";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const Count = () => {
  const { users } = useAllUsers();
  const currentTime = new Date().getTime();

  const subscribedUsers = users.filter(
    (user) => user?.expireTime > currentTime
  );
  const normalUsers = users.filter((user) => user?.expireTime < currentTime);

  return (
    <div>
      <SectionTitle heading="Our Users"></SectionTitle>
      <div className="flex flex-col lg:flex-row justify-center gap-5">
        <div className="flex flex-col items-center justify-center my-10 text-5xl">
          <CountUp start={0} end={users.length} duration={2.0} delay={0}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h2 className="mt-3 ">
            <span className="text-fuchsia-500 font-semibold">All</span> Users
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center my-10 text-5xl">
          <CountUp start={0} end={normalUsers.length} duration={2.0} delay={0}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h2 className="mt-3">
            <span className="text-orange-500 font-semibold">Normal</span> Users
          </h2>{" "}
        </div>
        <div className="flex flex-col items-center justify-center my-10 text-5xl">
          <CountUp
            start={0}
            end={subscribedUsers.length}
            duration={2.0}
            delay={0}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <h2 className="mt-3 ">
            <span className="text-green-500 font-semibold">All</span> Users
          </h2>{" "}
        </div>
      </div>
    </div>
  );
};

export default Count;
