interface IUseAchievementScore {
  achievementScore: number;
  goalScore: number;
}

export const useAchievementScore = ({
  achievementScore,
  goalScore,
}: IUseAchievementScore) => {
  let achievementTotalScore = (achievementScore / goalScore) * 100;

  if (achievementTotalScore > 100) {
    achievementTotalScore = 100;
  }

  return achievementTotalScore;
};
