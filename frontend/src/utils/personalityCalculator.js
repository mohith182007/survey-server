// Personality Classification System
export const PERSONALITY_TYPES = {
  SilentSentinel: {
    name: "The Silent Sentinel",
    animal: "The Owl",
    description: "Reflects traits similar to avoidant personality — extreme sensitivity to rejection and fear of emotional exposure. You are a solitary, watchful observer who operates independently, handling challenges alone and hiding emotional pain to avoid vulnerability.",
    reasoning: "Owls are solitary, watchful, and perceived as stoic observers. They operate independently, much like your tendency to handle challenges alone. Your silent nature mirrors an archetype that hides pain and avoids open emotional expression.",
    traits: ["Socially withdrawn", "Sensitive to criticism", "Hides pain", "Feels unworthy of support", "Independent", "Self-reliant"],
    strengths: [
      "Strong self-reliance",
      "Can handle pressure independently",
      "Maintains privacy effectively",
      "Thoughtful and observant",
      "Respects others' boundaries"
    ],
    weaknesses: [
      "Difficulty opening up emotionally",
      "May isolate when struggling",
      "Reluctant to ask for help",
      "Others may feel shut out",
      "Risk of emotional bottleneck"
    ],
    recommendations: [
      "Try sharing small emotional experiences with one trusted person",
      "Practice saying 'I need help' in low-stakes situations",
      "Consider journaling to process emotions",
      "Remember: vulnerability is strength, not weakness"
    ],
    careerFit: ["Research", "Technical Specialist", "Analysis", "Solo Work", "Independent Consulting"]
  },
  WatchfulGardener: {
    name: "The Watchful Gardener",
    animal: "The Fox",
    description: "You represent partial openness with strong boundaries, carefully selective in your emotional expression. Like a fox, you are intelligent and cautious, choosing relationships and paths wisely. You are empathetic yet self-protective, opening up only when situations feel safe and trustworthy.",
    reasoning: "Foxes are known for intelligence, caution, and adaptability. They carefully choose their paths and relationships. This aligns with your nature of being empathetic yet self-protective, maintaining control over your emotions while valuing meaningful connections.",
    traits: ["Empathetic yet self-protective", "Cautious in relationships", "Values emotional control", "Strategic about sharing", "Trusting but guarded"],
    strengths: [
      "Healthy emotional boundaries",
      "Good judgment in relationships",
      "Can both connect and protect self",
      "Resilient and adaptable",
      "Thoughtful in emotional decisions"
    ],
    weaknesses: [
      "May hold back too much",
      "Fear of dependence can limit connections",
      "Difficulty with full vulnerability",
      "Relationships may feel somewhat distant",
      "Perfectionism in emotional expression"
    ],
    recommendations: [
      "Gradually expand your circle of trust",
      "Practice vulnerability with one safe person",
      "Challenge beliefs about dependence as weakness",
      "Allow relationships to deepen naturally"
    ],
    careerFit: ["Management", "Project Leadership", "Human Resources", "Counseling", "Education"]
  },
  EmpathicAnchor: {
    name: "The Empathic Anchor",
    animal: "The Dolphin",
    description: "You thrive in connection and cooperation, highly social and communicative with genuine empathy for others. Your comfort with open communication and emotional expression creates strong, supportive relationships. You demonstrate healthy social-emotional regulation and adaptive help-seeking behavior.",
    reasoning: "Dolphins are highly social, communicative, and known for their cooperative and empathetic behavior. They thrive in pods and work together, reflecting your comfort with building strong, supportive connections and emotional openness.",
    traits: ["Emotionally aware", "Trusting", "Resilient", "Engages proactively", "Communicative", "Compassionate"],
    strengths: [
      "Builds deep, authentic relationships",
      "Excellent emotional intelligence",
      "Comfortable seeking and offering help",
      "Fosters genuine connections",
      "Strong listening and empathy skills",
      "Adaptable to different emotional contexts"
    ],
    weaknesses: [
      "May share too much too quickly",
      "Can be emotionally exhausted",
      "Might struggle with emotional boundaries",
      "Could be perceived as overly sensitive",
      "Risk of over-involvement in others' problems"
    ],
    recommendations: [
      "Maintain healthy emotional boundaries",
      "Practice self-care to avoid burnout",
      "Remember you can't fix everyone's problems",
      "Protect your own emotional energy"
    ],
    careerFit: ["Counseling", "Social Work", "Psychology", "Coaching", "HR", "Leadership", "Teaching"]
  },
  MaskedJester: {
    name: "The Masked Jester",
    animal: "The Chameleon",
    description: "You mask your true feelings with humor, sarcasm, or emotional distance as a defensive mechanism. Like a chameleon changing appearance, you adapt your outward expression to protect your vulnerable inner self. This reflects defensive emotional detachment, often a coping mechanism for fear of emotional pain.",
    reasoning: "Chameleons change appearance to blend in or signal emotional state, but it's a defensive mechanism. Your tendency to mask feelings with humor, sarcasm, or distraction mirrors this protection of your vulnerable inner self.",
    traits: ["Avoids intimacy", "Relies on distraction", "Suppresses emotions", "Uses humor as shield", "Emotionally detached"],
    strengths: [
      "Quick wit and humor",
      "Can remain composed in tense situations",
      "Adapts to different social contexts",
      "Protective of self",
      "Can diffuse tension effectively"
    ],
    weaknesses: [
      "Difficulty with genuine emotional connection",
      "Relationships may feel superficial",
      "Others may not understand true feelings",
      "Risk of emotional isolation",
      "May appear insensitive or cold",
      "Suppresses important emotions"
    ],
    recommendations: [
      "Try expressing one genuine emotion per week",
      "Practice replacing humor with honesty occasionally",
      "Explore why emotions feel threatening",
      "Build trust slowly with one person",
      "Consider what you're protecting yourself from"
    ],
    careerFit: ["Entertainment", "Sales", "Marketing", "Creative Fields", "Public Relations"]
  },
  AdaptiveHybrid: {
    name: "Adaptive Hybrid",
    animal: "The Phoenix",
    description: "You show a flexible blend of openness and caution, adapting your emotional and social responses based on your environment, past experiences, and current emotional state. You can seek help or express emotion when safe but may withdraw under stress. You are emotionally intelligent and situationally aware.",
    reasoning: "Your mixed responses suggest you adapt across different contexts. Like a phoenix, you transform your approach to emotions based on circumstances, showing both resilience and flexibility.",
    traits: ["Emotionally intelligent", "Situationally aware", "Resilient", "Flexible", "Adaptive", "Context-sensitive"],
    strengths: [
      "Can adjust emotional expression as needed",
      "Realistic about when to trust",
      "Balanced approach to relationships",
      "Good self-awareness",
      "Resilient across situations"
    ],
    weaknesses: [
      "Inconsistency might confuse others",
      "May overthink emotional decisions",
      "Can struggle with commitment patterns",
      "Might lack clear emotional identity"
    ],
    recommendations: [
      "Identify your core emotional values",
      "Notice patterns in when you open/close up",
      "Build stronger consistency with trusted people",
      "Celebrate your flexibility as strength"
    ],
    careerFit: ["Leadership", "Consulting", "Diverse Team Roles", "Change Management", "Negotiation"]
  },
  AmbivalentType: {
    name: "Ambivalent Type",
    animal: "The Butterfly",
    description: "You alternate between craving closeness and fearing rejection, showing contradictory responses in your answers. These emotional highs and lows, combined with inconsistent trust patterns, suggest you seek reassurance but also fear dependence. Your emotional style is conflicted but this awareness is valuable.",
    reasoning: "Like a butterfly that transforms between stages, you shift between wanting connection and fearing it. Your contradictory patterns reveal internal conflict about trust and closeness.",
    traits: ["Conflicted emotional style", "Seeks reassurance", "Fears dependence", "Emotional highs and lows", "Inconsistent trust"],
    strengths: [
      "Self-aware of conflicts",
      "Can understand multiple perspectives",
      "Seeks to resolve contradictions",
      "Empathetic to others' confusion",
      "Capacity for growth and change"
    ],
    weaknesses: [
      "Confusing to others and self",
      "Difficulty with consistent relationships",
      "Emotional exhaustion from conflict",
      "May send mixed signals",
      "Risk of being misunderstood"
    ],
    recommendations: [
      "Explore the root of your conflicting desires",
      "Work with a therapist on attachment patterns",
      "Practice consistent behavior with one person",
      "Understand triggers for push/pull patterns",
      "Build self-compassion for the conflict"
    ],
    careerFit: ["Psychology", "Mediation", "Therapy", "Coaching", "Human Services"]
  }
};

export const calculatePersonality = (answers, questions) => {
  // Count answer frequencies
  const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
  
  Object.entries(answers).forEach(([idx, selectedLabel]) => {
    answerCounts[selectedLabel]++;
  });

  // Determine classification based on most frequent answer
  const sorted = Object.entries(answerCounts).sort((a, b) => b[1] - a[1]);
  const primaryAnswer = sorted[0][0];
  const primaryCount = sorted[0][1];
  const secondaryCount = sorted[1][1];

  let type, profile;
  const totalQuestions = Object.keys(answers).length;

  // Check if it's a mixed/hybrid response
  const isBalanced = Math.abs(primaryCount - secondaryCount) <= 2;
  const hasMixedResponses = sorted.filter(([_, count]) => count >= totalQuestions * 0.2).length > 2;

  if (primaryAnswer === 'A') {
    type = "The Silent Sentinel";
    profile = PERSONALITY_TYPES.SilentSentinel;
  } else if (primaryAnswer === 'B') {
    type = "The Watchful Gardener";
    profile = PERSONALITY_TYPES.WatchfulGardener;
  } else if (primaryAnswer === 'C') {
    type = "The Empathic Anchor";
    profile = PERSONALITY_TYPES.EmpathicAnchor;
  } else if (primaryAnswer === 'D') {
    type = "The Masked Jester";
    profile = PERSONALITY_TYPES.MaskedJester;
  }

  // Check for hybrid/ambivalent types
  if (isBalanced || hasMixedResponses) {
    if (primaryAnswer === 'A' && secondaryCount >= totalQuestions * 0.25) {
      // Check if mixing A with C (conflicted openness)
      if (sorted[1][0] === 'C') {
        type = "Ambivalent Type (Conflicted)";
        profile = PERSONALITY_TYPES.AmbivalentType;
      } else {
        type = "Adaptive Hybrid";
        profile = PERSONALITY_TYPES.AdaptiveHybrid;
      }
    } else if (hasMixedResponses) {
      // Multiple answer types equally represented
      if ([...'ABC'].includes(primaryAnswer) || [...'BCD'].includes(primaryAnswer)) {
        type = "Adaptive Hybrid";
        profile = PERSONALITY_TYPES.AdaptiveHybrid;
      }
    }
  }

  return {
    type,
    answerCounts,
    primaryAnswer,
    profile,
    answerBreakdown: {
      A_count: answerCounts.A,
      B_count: answerCounts.B,
      C_count: answerCounts.C,
      D_count: answerCounts.D,
      total: totalQuestions
    }
  };
};

export const getRating = (answerCounts) => {
  // For new classification system
  if (answerCounts && typeof answerCounts === 'object') {
    const values = Object.values(answerCounts);
    const maxCount = Math.max(...values);
    const totalCount = values.reduce((a, b) => a + b, 0);
    const dominancePercentage = (maxCount / totalCount) * 100;
    
    if (dominancePercentage >= 60) return "Very Strong";
    if (dominancePercentage >= 50) return "Strong";
    if (dominancePercentage >= 40) return "Moderate";
    if (dominancePercentage >= 30) return "Balanced/Mixed";
    return "Highly Mixed";
  }
  
  return "Moderate";
};
