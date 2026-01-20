import JudgmentDisplay from "../JudgmentDisplay";

export default function JudgmentDisplayExample() {
  return (
    <div className="w-full space-y-8 p-4">
      <JudgmentDisplay canReach={true} destination="八丁堀" />
      <div className="border-t border-border my-8" />
      <JudgmentDisplay canReach={false} destination="宮島口" />
    </div>
  );
}
