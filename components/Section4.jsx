import { useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { ParentSize } from "@visx/responsive";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import { groupBy, flatten } from "lodash";
import SeasonMenu from "./SeasonMenu.jsx";

const seasonLabel = ["Winter", "Spring", "Summer", "Autumn"];

const Section4 = ({ data, energyDemand }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCompareSeason, setSelCompareSeason] = useState([0, 1]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const hoverCategory = useStore((state) => state.hoverCategory);

  const setSelectedCompareSeason = (val) => {
    if (selectedCompareSeason.length < 2) {
      setSelCompareSeason((state) => [...state, val]);
    }
  };

  const unsetSelectedCompareSeason = (val) => {
    setSelCompareSeason(selectedCompareSeason.filter((state) => state !== val));
  };

  const grouped = groupBy(data, "season");
  const grouped1 = Object.values(grouped).map((v) => groupBy(v, "region"));
  const grouped2 = grouped1.map((v) => {
    const values = Object.values(v);
    const final = values.map((arr) => {
      const filteredValues = Object.values(groupBy(arr, "act_category"));
      const filteredReduced = filteredValues.map((values) => {
        const filteredGroupedValues = Object.values(
          groupBy(values, "act_type")
        );
        const reducedGroup = filteredGroupedValues.map((groupedValues) => {
          const reduced = groupedValues.reduce(
            (previousValue, currentValue) => {
              const newObj = {
                act_category: currentValue.act_category,
                act_type: currentValue.act_type,
                region: currentValue.region,
                season: currentValue.season,
                t_1: previousValue.t_1
                  ? (parseFloat(previousValue.t_1) +
                      parseFloat(currentValue.t_1)) /
                    2
                  : parseFloat(currentValue.t_1),
                t_2: previousValue.t_2
                  ? (parseFloat(previousValue.t_2) +
                      parseFloat(currentValue.t_2)) /
                    2
                  : parseFloat(currentValue.t_2),
                t_3: previousValue.t_3
                  ? (parseFloat(previousValue.t_3) +
                      parseFloat(currentValue.t_3)) /
                    2
                  : parseFloat(currentValue.t_3),
                t_4: previousValue.t_4
                  ? (parseFloat(previousValue.t_4) +
                      parseFloat(currentValue.t_4)) /
                    2
                  : parseFloat(currentValue.t_4),
                t_5: previousValue.t_5
                  ? (parseFloat(previousValue.t_5) +
                      parseFloat(currentValue.t_5)) /
                    2
                  : parseFloat(currentValue.t_5),
                t_6: previousValue.t_6
                  ? (parseFloat(previousValue.t_6) +
                      parseFloat(currentValue.t_6)) /
                    2
                  : parseFloat(currentValue.t_6),
                t_7: previousValue.t_7
                  ? (parseFloat(previousValue.t_7) +
                      parseFloat(currentValue.t_7)) /
                    2
                  : parseFloat(currentValue.t_7),
                t_8: previousValue.t_8
                  ? (parseFloat(previousValue.t_8) +
                      parseFloat(currentValue.t_8)) /
                    2
                  : parseFloat(currentValue.t_8),
                t_9: previousValue.t_9
                  ? (parseFloat(previousValue.t_9) +
                      parseFloat(currentValue.t_9)) /
                    2
                  : parseFloat(currentValue.t_9),
                t_10: previousValue.t_10
                  ? (parseFloat(previousValue.t_10) +
                      parseFloat(currentValue.t_10)) /
                    2
                  : parseFloat(currentValue.t_10),
                t_11: previousValue.t_11
                  ? (parseFloat(previousValue.t_11) +
                      parseFloat(currentValue.t_11)) /
                    2
                  : parseFloat(currentValue.t_11),
                t_12: previousValue.t_12
                  ? (parseFloat(previousValue.t_12) +
                      parseFloat(currentValue.t_12)) /
                    2
                  : parseFloat(currentValue.t_12),
                t_13: previousValue.t_13
                  ? (parseFloat(previousValue.t_13) +
                      parseFloat(currentValue.t_13)) /
                    2
                  : parseFloat(currentValue.t_13),
                t_14: previousValue.t_14
                  ? (parseFloat(previousValue.t_14) +
                      parseFloat(currentValue.t_14)) /
                    2
                  : parseFloat(currentValue.t_14),
                t_15: previousValue.t_15
                  ? (parseFloat(previousValue.t_15) +
                      parseFloat(currentValue.t_15)) /
                    2
                  : parseFloat(currentValue.t_15),
                t_16: previousValue.t_16
                  ? (parseFloat(previousValue.t_16) +
                      parseFloat(currentValue.t_16)) /
                    2
                  : parseFloat(currentValue.t_16),
                t_17: previousValue.t_17
                  ? (parseFloat(previousValue.t_17) +
                      parseFloat(currentValue.t_17)) /
                    2
                  : parseFloat(currentValue.t_17),
                t_18: previousValue.t_18
                  ? (parseFloat(previousValue.t_18) +
                      parseFloat(currentValue.t_18)) /
                    2
                  : parseFloat(currentValue.t_18),
                t_19: previousValue.t_19
                  ? (parseFloat(previousValue.t_19) +
                      parseFloat(currentValue.t_19)) /
                    2
                  : parseFloat(currentValue.t_19),
                t_20: previousValue.t_20
                  ? (parseFloat(previousValue.t_20) +
                      parseFloat(currentValue.t_20)) /
                    2
                  : parseFloat(currentValue.t_20),
                t_21: previousValue.t_21
                  ? (parseFloat(previousValue.t_21) +
                      parseFloat(currentValue.t_21)) /
                    2
                  : parseFloat(currentValue.t_21),
                t_22: previousValue.t_22
                  ? (parseFloat(previousValue.t_22) +
                      parseFloat(currentValue.t_22)) /
                    2
                  : parseFloat(currentValue.t_22),
                t_23: previousValue.t_23
                  ? (parseFloat(previousValue.t_23) +
                      parseFloat(currentValue.t_23)) /
                    2
                  : parseFloat(currentValue.t_23),
                t_24: previousValue.t_24
                  ? (parseFloat(previousValue.t_24) +
                      parseFloat(currentValue.t_24)) /
                    2
                  : parseFloat(currentValue.t_24),
                t_25: previousValue.t_25
                  ? (parseFloat(previousValue.t_25) +
                      parseFloat(currentValue.t_25)) /
                    2
                  : parseFloat(currentValue.t_25),
                t_26: previousValue.t_26
                  ? (parseFloat(previousValue.t_26) +
                      parseFloat(currentValue.t_26)) /
                    2
                  : parseFloat(currentValue.t_26),
                t_27: previousValue.t_27
                  ? (parseFloat(previousValue.t_27) +
                      parseFloat(currentValue.t_27)) /
                    2
                  : parseFloat(currentValue.t_27),
                t_28: previousValue.t_28
                  ? (parseFloat(previousValue.t_28) +
                      parseFloat(currentValue.t_28)) /
                    2
                  : parseFloat(currentValue.t_28),
                t_29: previousValue.t_29
                  ? (parseFloat(previousValue.t_29) +
                      parseFloat(currentValue.t_29)) /
                    2
                  : parseFloat(currentValue.t_29),
                t_30: previousValue.t_30
                  ? (parseFloat(previousValue.t_30) +
                      parseFloat(currentValue.t_30)) /
                    2
                  : parseFloat(currentValue.t_30),
                t_31: previousValue.t_31
                  ? (parseFloat(previousValue.t_31) +
                      parseFloat(currentValue.t_31)) /
                    2
                  : parseFloat(currentValue.t_31),
                t_32: previousValue.t_32
                  ? (parseFloat(previousValue.t_32) +
                      parseFloat(currentValue.t_32)) /
                    2
                  : parseFloat(currentValue.t_32),
                t_33: previousValue.t_33
                  ? (parseFloat(previousValue.t_33) +
                      parseFloat(currentValue.t_33)) /
                    2
                  : parseFloat(currentValue.t_33),
                t_34: previousValue.t_34
                  ? (parseFloat(previousValue.t_34) +
                      parseFloat(currentValue.t_34)) /
                    2
                  : parseFloat(currentValue.t_34),
                t_35: previousValue.t_35
                  ? (parseFloat(previousValue.t_35) +
                      parseFloat(currentValue.t_35)) /
                    2
                  : parseFloat(currentValue.t_35),
                t_36: previousValue.t_36
                  ? (parseFloat(previousValue.t_36) +
                      parseFloat(currentValue.t_36)) /
                    2
                  : parseFloat(currentValue.t_36),
                t_37: previousValue.t_37
                  ? (parseFloat(previousValue.t_37) +
                      parseFloat(currentValue.t_37)) /
                    2
                  : parseFloat(currentValue.t_37),
                t_38: previousValue.t_38
                  ? (parseFloat(previousValue.t_38) +
                      parseFloat(currentValue.t_38)) /
                    2
                  : parseFloat(currentValue.t_38),
                t_39: previousValue.t_39
                  ? (parseFloat(previousValue.t_39) +
                      parseFloat(currentValue.t_39)) /
                    2
                  : parseFloat(currentValue.t_39),
                t_40: previousValue.t_40
                  ? (parseFloat(previousValue.t_40) +
                      parseFloat(currentValue.t_40)) /
                    2
                  : parseFloat(currentValue.t_40),
                t_41: previousValue.t_41
                  ? (parseFloat(previousValue.t_41) +
                      parseFloat(currentValue.t_41)) /
                    2
                  : parseFloat(currentValue.t_41),
                t_42: previousValue.t_42
                  ? (parseFloat(previousValue.t_42) +
                      parseFloat(currentValue.t_42)) /
                    2
                  : parseFloat(currentValue.t_42),
                t_43: previousValue.t_43
                  ? (parseFloat(previousValue.t_43) +
                      parseFloat(currentValue.t_43)) /
                    2
                  : parseFloat(currentValue.t_43),
                t_44: previousValue.t_44
                  ? (parseFloat(previousValue.t_44) +
                      parseFloat(currentValue.t_44)) /
                    2
                  : parseFloat(currentValue.t_44),
                t_45: previousValue.t_45
                  ? (parseFloat(previousValue.t_45) +
                      parseFloat(currentValue.t_45)) /
                    2
                  : parseFloat(currentValue.t_45),
                t_46: previousValue.t_46
                  ? (parseFloat(previousValue.t_46) +
                      parseFloat(currentValue.t_46)) /
                    2
                  : parseFloat(currentValue.t_46),
                t_47: previousValue.t_47
                  ? (parseFloat(previousValue.t_47) +
                      parseFloat(currentValue.t_47)) /
                    2
                  : parseFloat(currentValue.t_47),
                t_48: previousValue.t_48
                  ? (parseFloat(previousValue.t_48) +
                      parseFloat(currentValue.t_48)) /
                    2
                  : parseFloat(currentValue.t_48),
                t_49: previousValue.t_49
                  ? (parseFloat(previousValue.t_49) +
                      parseFloat(currentValue.t_49)) /
                    2
                  : parseFloat(currentValue.t_49),
                t_50: previousValue.t_50
                  ? (parseFloat(previousValue.t_50) +
                      parseFloat(currentValue.t_50)) /
                    2
                  : parseFloat(currentValue.t_50),
                t_51: previousValue.t_51
                  ? (parseFloat(previousValue.t_51) +
                      parseFloat(currentValue.t_51)) /
                    2
                  : parseFloat(currentValue.t_51),
                t_52: previousValue.t_52
                  ? (parseFloat(previousValue.t_52) +
                      parseFloat(currentValue.t_52)) /
                    2
                  : parseFloat(currentValue.t_52),
                t_53: previousValue.t_53
                  ? (parseFloat(previousValue.t_53) +
                      parseFloat(currentValue.t_53)) /
                    2
                  : parseFloat(currentValue.t_53),
                t_54: previousValue.t_54
                  ? (parseFloat(previousValue.t_54) +
                      parseFloat(currentValue.t_54)) /
                    2
                  : parseFloat(currentValue.t_54),
                t_55: previousValue.t_55
                  ? (parseFloat(previousValue.t_55) +
                      parseFloat(currentValue.t_55)) /
                    2
                  : parseFloat(currentValue.t_55),
                t_56: previousValue.t_56
                  ? (parseFloat(previousValue.t_56) +
                      parseFloat(currentValue.t_56)) /
                    2
                  : parseFloat(currentValue.t_56),
                t_57: previousValue.t_57
                  ? (parseFloat(previousValue.t_57) +
                      parseFloat(currentValue.t_57)) /
                    2
                  : parseFloat(currentValue.t_57),
                t_58: previousValue.t_58
                  ? (parseFloat(previousValue.t_58) +
                      parseFloat(currentValue.t_58)) /
                    2
                  : parseFloat(currentValue.t_58),
                t_59: previousValue.t_59
                  ? (parseFloat(previousValue.t_59) +
                      parseFloat(currentValue.t_59)) /
                    2
                  : parseFloat(currentValue.t_59),
                t_60: previousValue.t_60
                  ? (parseFloat(previousValue.t_60) +
                      parseFloat(currentValue.t_60)) /
                    2
                  : parseFloat(currentValue.t_60),
                t_61: previousValue.t_61
                  ? (parseFloat(previousValue.t_61) +
                      parseFloat(currentValue.t_61)) /
                    2
                  : parseFloat(currentValue.t_61),
                t_62: previousValue.t_62
                  ? (parseFloat(previousValue.t_62) +
                      parseFloat(currentValue.t_62)) /
                    2
                  : parseFloat(currentValue.t_62),
                t_63: previousValue.t_63
                  ? (parseFloat(previousValue.t_63) +
                      parseFloat(currentValue.t_63)) /
                    2
                  : parseFloat(currentValue.t_63),
                t_64: previousValue.t_64
                  ? (parseFloat(previousValue.t_64) +
                      parseFloat(currentValue.t_64)) /
                    2
                  : parseFloat(currentValue.t_64),
                t_65: previousValue.t_65
                  ? (parseFloat(previousValue.t_65) +
                      parseFloat(currentValue.t_65)) /
                    2
                  : parseFloat(currentValue.t_65),
                t_66: previousValue.t_66
                  ? (parseFloat(previousValue.t_66) +
                      parseFloat(currentValue.t_66)) /
                    2
                  : parseFloat(currentValue.t_66),
                t_67: previousValue.t_67
                  ? (parseFloat(previousValue.t_67) +
                      parseFloat(currentValue.t_67)) /
                    2
                  : parseFloat(currentValue.t_67),
                t_68: previousValue.t_68
                  ? (parseFloat(previousValue.t_68) +
                      parseFloat(currentValue.t_68)) /
                    2
                  : parseFloat(currentValue.t_68),
                t_69: previousValue.t_69
                  ? (parseFloat(previousValue.t_69) +
                      parseFloat(currentValue.t_69)) /
                    2
                  : parseFloat(currentValue.t_69),
                t_70: previousValue.t_70
                  ? (parseFloat(previousValue.t_70) +
                      parseFloat(currentValue.t_70)) /
                    2
                  : parseFloat(currentValue.t_70),
                t_71: previousValue.t_71
                  ? (parseFloat(previousValue.t_71) +
                      parseFloat(currentValue.t_71)) /
                    2
                  : parseFloat(currentValue.t_71),
                t_72: previousValue.t_72
                  ? (parseFloat(previousValue.t_72) +
                      parseFloat(currentValue.t_72)) /
                    2
                  : parseFloat(currentValue.t_72),
                t_73: previousValue.t_73
                  ? (parseFloat(previousValue.t_73) +
                      parseFloat(currentValue.t_73)) /
                    2
                  : parseFloat(currentValue.t_73),
                t_74: previousValue.t_74
                  ? (parseFloat(previousValue.t_74) +
                      parseFloat(currentValue.t_74)) /
                    2
                  : parseFloat(currentValue.t_74),
                t_75: previousValue.t_75
                  ? (parseFloat(previousValue.t_75) +
                      parseFloat(currentValue.t_75)) /
                    2
                  : parseFloat(currentValue.t_75),
                t_76: previousValue.t_76
                  ? (parseFloat(previousValue.t_76) +
                      parseFloat(currentValue.t_76)) /
                    2
                  : parseFloat(currentValue.t_76),
                t_77: previousValue.t_77
                  ? (parseFloat(previousValue.t_77) +
                      parseFloat(currentValue.t_77)) /
                    2
                  : parseFloat(currentValue.t_77),
                t_78: previousValue.t_78
                  ? (parseFloat(previousValue.t_78) +
                      parseFloat(currentValue.t_78)) /
                    2
                  : parseFloat(currentValue.t_78),
                t_79: previousValue.t_79
                  ? (parseFloat(previousValue.t_79) +
                      parseFloat(currentValue.t_79)) /
                    2
                  : parseFloat(currentValue.t_79),
                t_80: previousValue.t_80
                  ? (parseFloat(previousValue.t_80) +
                      parseFloat(currentValue.t_80)) /
                    2
                  : parseFloat(currentValue.t_80),
                t_81: previousValue.t_81
                  ? (parseFloat(previousValue.t_81) +
                      parseFloat(currentValue.t_81)) /
                    2
                  : parseFloat(currentValue.t_81),
                t_82: previousValue.t_82
                  ? (parseFloat(previousValue.t_82) +
                      parseFloat(currentValue.t_82)) /
                    2
                  : parseFloat(currentValue.t_82),
                t_83: previousValue.t_83
                  ? (parseFloat(previousValue.t_83) +
                      parseFloat(currentValue.t_83)) /
                    2
                  : parseFloat(currentValue.t_83),
                t_84: previousValue.t_84
                  ? (parseFloat(previousValue.t_84) +
                      parseFloat(currentValue.t_84)) /
                    2
                  : parseFloat(currentValue.t_84),
                t_85: previousValue.t_85
                  ? (parseFloat(previousValue.t_85) +
                      parseFloat(currentValue.t_85)) /
                    2
                  : parseFloat(currentValue.t_85),
                t_86: previousValue.t_86
                  ? (parseFloat(previousValue.t_86) +
                      parseFloat(currentValue.t_86)) /
                    2
                  : parseFloat(currentValue.t_86),
                t_87: previousValue.t_87
                  ? (parseFloat(previousValue.t_87) +
                      parseFloat(currentValue.t_87)) /
                    2
                  : parseFloat(currentValue.t_87),
                t_88: previousValue.t_88
                  ? (parseFloat(previousValue.t_88) +
                      parseFloat(currentValue.t_88)) /
                    2
                  : parseFloat(currentValue.t_88),
                t_89: previousValue.t_89
                  ? (parseFloat(previousValue.t_89) +
                      parseFloat(currentValue.t_89)) /
                    2
                  : parseFloat(currentValue.t_89),
                t_90: previousValue.t_90
                  ? (parseFloat(previousValue.t_90) +
                      parseFloat(currentValue.t_90)) /
                    2
                  : parseFloat(currentValue.t_90),
                t_91: previousValue.t_91
                  ? (parseFloat(previousValue.t_91) +
                      parseFloat(currentValue.t_91)) /
                    2
                  : parseFloat(currentValue.t_91),
                t_92: previousValue.t_92
                  ? (parseFloat(previousValue.t_92) +
                      parseFloat(currentValue.t_92)) /
                    2
                  : parseFloat(currentValue.t_92),
                t_93: previousValue.t_93
                  ? (parseFloat(previousValue.t_93) +
                      parseFloat(currentValue.t_93)) /
                    2
                  : parseFloat(currentValue.t_93),
                t_94: previousValue.t_94
                  ? (parseFloat(previousValue.t_94) +
                      parseFloat(currentValue.t_94)) /
                    2
                  : parseFloat(currentValue.t_94),
                t_95: previousValue.t_95
                  ? (parseFloat(previousValue.t_95) +
                      parseFloat(currentValue.t_95)) /
                    2
                  : parseFloat(currentValue.t_95),
                t_96: previousValue.t_96
                  ? (parseFloat(previousValue.t_96) +
                      parseFloat(currentValue.t_96)) /
                    2
                  : parseFloat(currentValue.t_96),
                t_97: previousValue.t_97
                  ? (parseFloat(previousValue.t_97) +
                      parseFloat(currentValue.t_97)) /
                    2
                  : parseFloat(currentValue.t_97),
                t_98: previousValue.t_98
                  ? (parseFloat(previousValue.t_98) +
                      parseFloat(currentValue.t_98)) /
                    2
                  : parseFloat(currentValue.t_98),
                t_99: previousValue.t_99
                  ? (parseFloat(previousValue.t_99) +
                      parseFloat(currentValue.t_99)) /
                    2
                  : parseFloat(currentValue.t_99),
                t_100: previousValue.t_100
                  ? (parseFloat(previousValue.t_100) +
                      parseFloat(currentValue.t_100)) /
                    2
                  : parseFloat(currentValue.t_100),
                t_101: previousValue.t_101
                  ? (parseFloat(previousValue.t_101) +
                      parseFloat(currentValue.t_101)) /
                    2
                  : parseFloat(currentValue.t_101),
                t_102: previousValue.t_102
                  ? (parseFloat(previousValue.t_102) +
                      parseFloat(currentValue.t_102)) /
                    2
                  : parseFloat(currentValue.t_102),
                t_103: previousValue.t_103
                  ? (parseFloat(previousValue.t_103) +
                      parseFloat(currentValue.t_103)) /
                    2
                  : parseFloat(currentValue.t_103),
                t_104: previousValue.t_104
                  ? (parseFloat(previousValue.t_104) +
                      parseFloat(currentValue.t_104)) /
                    2
                  : parseFloat(currentValue.t_104),
                t_105: previousValue.t_105
                  ? (parseFloat(previousValue.t_105) +
                      parseFloat(currentValue.t_105)) /
                    2
                  : parseFloat(currentValue.t_105),
                t_106: previousValue.t_106
                  ? (parseFloat(previousValue.t_106) +
                      parseFloat(currentValue.t_106)) /
                    2
                  : parseFloat(currentValue.t_106),
                t_107: previousValue.t_107
                  ? (parseFloat(previousValue.t_107) +
                      parseFloat(currentValue.t_107)) /
                    2
                  : parseFloat(currentValue.t_107),
                t_108: previousValue.t_108
                  ? (parseFloat(previousValue.t_108) +
                      parseFloat(currentValue.t_108)) /
                    2
                  : parseFloat(currentValue.t_108),
                t_109: previousValue.t_109
                  ? (parseFloat(previousValue.t_109) +
                      parseFloat(currentValue.t_109)) /
                    2
                  : parseFloat(currentValue.t_109),
                t_110: previousValue.t_110
                  ? (parseFloat(previousValue.t_110) +
                      parseFloat(currentValue.t_110)) /
                    2
                  : parseFloat(currentValue.t_110),
                t_111: previousValue.t_111
                  ? (parseFloat(previousValue.t_111) +
                      parseFloat(currentValue.t_111)) /
                    2
                  : parseFloat(currentValue.t_111),
                t_112: previousValue.t_112
                  ? (parseFloat(previousValue.t_112) +
                      parseFloat(currentValue.t_112)) /
                    2
                  : parseFloat(currentValue.t_112),
                t_113: previousValue.t_113
                  ? (parseFloat(previousValue.t_113) +
                      parseFloat(currentValue.t_113)) /
                    2
                  : parseFloat(currentValue.t_113),
                t_114: previousValue.t_114
                  ? (parseFloat(previousValue.t_114) +
                      parseFloat(currentValue.t_114)) /
                    2
                  : parseFloat(currentValue.t_114),
                t_115: previousValue.t_115
                  ? (parseFloat(previousValue.t_115) +
                      parseFloat(currentValue.t_115)) /
                    2
                  : parseFloat(currentValue.t_115),
                t_116: previousValue.t_116
                  ? (parseFloat(previousValue.t_116) +
                      parseFloat(currentValue.t_116)) /
                    2
                  : parseFloat(currentValue.t_116),
                t_117: previousValue.t_117
                  ? (parseFloat(previousValue.t_117) +
                      parseFloat(currentValue.t_117)) /
                    2
                  : parseFloat(currentValue.t_117),
                t_118: previousValue.t_118
                  ? (parseFloat(previousValue.t_118) +
                      parseFloat(currentValue.t_118)) /
                    2
                  : parseFloat(currentValue.t_118),
                t_119: previousValue.t_119
                  ? (parseFloat(previousValue.t_119) +
                      parseFloat(currentValue.t_119)) /
                    2
                  : parseFloat(currentValue.t_119),
                t_120: previousValue.t_120
                  ? (parseFloat(previousValue.t_120) +
                      parseFloat(currentValue.t_120)) /
                    2
                  : parseFloat(currentValue.t_120),
                t_121: previousValue.t_121
                  ? (parseFloat(previousValue.t_121) +
                      parseFloat(currentValue.t_121)) /
                    2
                  : parseFloat(currentValue.t_121),
                t_122: previousValue.t_122
                  ? (parseFloat(previousValue.t_122) +
                      parseFloat(currentValue.t_122)) /
                    2
                  : parseFloat(currentValue.t_122),
                t_123: previousValue.t_123
                  ? (parseFloat(previousValue.t_123) +
                      parseFloat(currentValue.t_123)) /
                    2
                  : parseFloat(currentValue.t_123),
                t_124: previousValue.t_124
                  ? (parseFloat(previousValue.t_124) +
                      parseFloat(currentValue.t_124)) /
                    2
                  : parseFloat(currentValue.t_124),
                t_125: previousValue.t_125
                  ? (parseFloat(previousValue.t_125) +
                      parseFloat(currentValue.t_125)) /
                    2
                  : parseFloat(currentValue.t_125),
                t_126: previousValue.t_126
                  ? (parseFloat(previousValue.t_126) +
                      parseFloat(currentValue.t_126)) /
                    2
                  : parseFloat(currentValue.t_126),
                t_127: previousValue.t_127
                  ? (parseFloat(previousValue.t_127) +
                      parseFloat(currentValue.t_127)) /
                    2
                  : parseFloat(currentValue.t_127),
                t_128: previousValue.t_128
                  ? (parseFloat(previousValue.t_128) +
                      parseFloat(currentValue.t_128)) /
                    2
                  : parseFloat(currentValue.t_128),
                t_129: previousValue.t_129
                  ? (parseFloat(previousValue.t_129) +
                      parseFloat(currentValue.t_129)) /
                    2
                  : parseFloat(currentValue.t_129),
                t_130: previousValue.t_130
                  ? (parseFloat(previousValue.t_130) +
                      parseFloat(currentValue.t_130)) /
                    2
                  : parseFloat(currentValue.t_130),
                t_131: previousValue.t_131
                  ? (parseFloat(previousValue.t_131) +
                      parseFloat(currentValue.t_131)) /
                    2
                  : parseFloat(currentValue.t_131),
                t_132: previousValue.t_132
                  ? (parseFloat(previousValue.t_132) +
                      parseFloat(currentValue.t_132)) /
                    2
                  : parseFloat(currentValue.t_132),
                t_133: previousValue.t_133
                  ? (parseFloat(previousValue.t_133) +
                      parseFloat(currentValue.t_133)) /
                    2
                  : parseFloat(currentValue.t_133),
                t_134: previousValue.t_134
                  ? (parseFloat(previousValue.t_134) +
                      parseFloat(currentValue.t_134)) /
                    2
                  : parseFloat(currentValue.t_134),
                t_135: previousValue.t_135
                  ? (parseFloat(previousValue.t_135) +
                      parseFloat(currentValue.t_135)) /
                    2
                  : parseFloat(currentValue.t_135),
                t_136: previousValue.t_136
                  ? (parseFloat(previousValue.t_136) +
                      parseFloat(currentValue.t_136)) /
                    2
                  : parseFloat(currentValue.t_136),
                t_137: previousValue.t_137
                  ? (parseFloat(previousValue.t_137) +
                      parseFloat(currentValue.t_137)) /
                    2
                  : parseFloat(currentValue.t_137),
                t_138: previousValue.t_138
                  ? (parseFloat(previousValue.t_138) +
                      parseFloat(currentValue.t_138)) /
                    2
                  : parseFloat(currentValue.t_138),
                t_139: previousValue.t_139
                  ? (parseFloat(previousValue.t_139) +
                      parseFloat(currentValue.t_139)) /
                    2
                  : parseFloat(currentValue.t_139),
                t_140: previousValue.t_140
                  ? (parseFloat(previousValue.t_140) +
                      parseFloat(currentValue.t_140)) /
                    2
                  : parseFloat(currentValue.t_140),
                t_141: previousValue.t_141
                  ? (parseFloat(previousValue.t_141) +
                      parseFloat(currentValue.t_141)) /
                    2
                  : parseFloat(currentValue.t_141),
                t_142: previousValue.t_142
                  ? (parseFloat(previousValue.t_142) +
                      parseFloat(currentValue.t_142)) /
                    2
                  : parseFloat(currentValue.t_142),
                t_143: previousValue.t_143
                  ? (parseFloat(previousValue.t_143) +
                      parseFloat(currentValue.t_143)) /
                    2
                  : parseFloat(currentValue.t_143),
                t_144: previousValue.t_144
                  ? (parseFloat(previousValue.t_144) +
                      parseFloat(currentValue.t_144)) /
                    2
                  : parseFloat(currentValue.t_144),
              };
              return newObj;
            },
            {}
          );
          return reduced;
        });
        return reducedGroup;
      });

      return flatten(filteredReduced);
    });

    return flatten(final);
  });

  //console.log("grouped2", grouped2);

  const seasonData1 =
    selectedCompareSeason[0] !== undefined
      ? flatten(grouped2[selectedCompareSeason[0]])
      : [];
  const seasonData2 = selectedCompareSeason[1]
    ? flatten(grouped2[selectedCompareSeason[1]])
    : [];

  console.log("seasonData1", seasonData1);
  console.log("seasonData2", seasonData2);

  // const aggregated = grouped.map((v) => {
  //   console.log(v);
  // });

  return (
    <section className="w-full flex">
      <LeftColumn>
        <h2 className="text-4xl">Seasons of the year</h2>
        <p>
          Seasons are emerging as relevant to many aspects of research on
          flexibility and yet in energy research they tend to be dominated by
          discourses around averages of volumes (e.g. demand is higher when the
          weather is cold). Seasonal variations in energy demand have
          significant implications for system balancing between demand and
          supply and flexibility. Everyday life and energy demand follow
          seasonal patterns. What if demand itself could provide inter-seasonal
          flexibility? The seasonality of electricity and gas consumption offers
          an indication of how what constitutes demand changes depending on the
          season. In essence, the rhythms of demand are better understood if all
          types of temporal variation (from seconds to decades, perhaps even
          centuries) are taken into account.
        </p>
      </LeftColumn>
      <RightColumn>
        <div className="flex w-full flex-col">
          <div>
            <div
              className="radial-overview-toolbar text-left"
              style={{ height: "auto" }}
            ></div>
          </div>
          <SeasonMenu
            setSelectedCompareSeason={setSelectedCompareSeason}
            unsetSelectedCompareSeason={unsetSelectedCompareSeason}
            selectedCompareSeason={selectedCompareSeason}
          />
          <ActivitiesMenu
            activitiesArray={activitiesArray}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="flex w-full">
            <div className="w-1/2 px-8">
              {selectedCompareSeason[0] !== undefined && (
                <ParentSize>
                  {(parent) => (
                    <RadarYear
                      globalData={seasonData1 || []}
                      energyDemand={energyDemand}
                      energyPrice={[]}
                      selectedRegion={"all"}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                      showDemand={false}
                      innerLabel={seasonLabel[selectedCompareSeason[0]]}
                    />
                  )}
                </ParentSize>
              )}
            </div>
            <div className="w-1/2 px-8">
              {selectedCompareSeason[1] && (
                <ParentSize>
                  {(parent) => (
                    <RadarYear
                      globalData={seasonData2 || []}
                      energyDemand={energyDemand}
                      energyPrice={[]}
                      selectedRegion={"all"}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                      showDemand={false}
                      innerLabel={seasonLabel[selectedCompareSeason[1]]}
                    />
                  )}
                </ParentSize>
              )}
            </div>
          </div>
        </div>
      </RightColumn>
    </section>
  );
};

export default Section4;
