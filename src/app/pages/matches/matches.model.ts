import { Team } from "../teams/team.model";

export interface Matches{
      challenger: Team;
      challenged: Team;
      date: Date;
      location: string;
}