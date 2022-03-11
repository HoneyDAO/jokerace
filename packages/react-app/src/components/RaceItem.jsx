import React, {useState} from "react";
import { Card, Button, Modal, Input, Statistic } from "antd";
import JokeItem from "./JokeItem";
import CreateJokeModal from "./CreateJokeModal";

const { Countdown } = Statistic;

function voteSortFunc(joke1, joke2) {
  if (joke1.votes < joke2.votes) {
    return 1;
  }
  if (joke1.votes > joke2.votes) {
    return -1;
  }
  return 0;
}

export default function RaceItem({raceData}) {
  const [isSubmitJokeModalVisible, setIsSubmitJokeModalVisible] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const showModal = () => {
    setIsSubmitJokeModalVisible(true);
  };

  return ( 
    <Card>
      <h2>{raceData.name}</h2>
      <h3>Created By: {raceData.creator}</h3>
      <h4>From {new Date(raceData.startTime).toUTCString()}</h4>
      <h4>To {new Date(raceData.endTime).toUTCString()}</h4>
      <Button onClick={() => setShowCountdown(!showCountdown)}>Toggle Countdown</Button>
      <Button type="primary" onClick={showModal}>
        Submit Joke
      </Button>
      <CreateJokeModal raceId={raceData.id} raceName={raceData.name} modalVisible={isSubmitJokeModalVisible} setModalVisible={setIsSubmitJokeModalVisible} />
      {showCountdown 
        ? <div>
            <div>Time until end of race: <Countdown visible={isSubmitJokeModalVisible} value={raceData.endTime}></Countdown></div>
          </div>
        : null
      }
      {raceData.jokes.sort(voteSortFunc).map(
        (joke) => { return <JokeItem joke={joke} /> }
      )}
    </Card>
  );
}