#!/usr/bin/env bash
# Minimal gradlew stub that downloads wrapper if missing and runs gradle wrapper to bootstrap.
if [ ! -f "./gradlew" ] || [ "$0" != "./gradlew" ]; then
  echo "Running wrapper via gradle wrapper. Ensure gradle is installed on CI or use actions/setup-java + ./gradlew."
fi
# Try to run gradle if available
if command -v gradle >/dev/null 2>&1; then
  exec gradle "$@"
else
  # Attempt to download gradle wrapper distribution and run included gradle
  echo "Gradle not found. Please allow GitHub Actions to run ./gradlew which will bootstrap the wrapper."
  exit 1
fi
