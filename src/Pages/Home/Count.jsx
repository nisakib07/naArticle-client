import CountUp from "react-countup";
import useAllUsers from "../../hooks/useAllUsers";

const Count = () => {
  const { users } = useAllUsers();

  return (
    <div className="flex flex-col items-center justify-center my-10 text-5xl">
      <CountUp start={0} end={users.length} duration={4.0} delay={0}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
      <h2 className="mt-3">All Users</h2>
    </div>
  );
};

export default Count;
