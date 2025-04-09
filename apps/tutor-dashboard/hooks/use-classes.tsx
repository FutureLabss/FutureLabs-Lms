"use client";

import { useState, useEffect } from "react";
import type { Class } from "@/lib/types";
import * as classService from "@/services/class-service";

export function useClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchClasses() {
      try {
        setIsLoading(true);
        const data = await classService.getClasses();
        setClasses(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchClasses();
  }, []);

  const refreshClasses = async () => {
    try {
      setIsLoading(true);
      const data = await classService.getClasses();
      setClasses(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addClass = async (classData: Partial<Class>) => {
    try {
      const result = await classService.createClass(classData);
      if (result.success) {
        await refreshClasses();
        return result.data;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to add class"));
      throw err;
    }
  };

  const updateClass = async (classId: string, classData: Partial<Class>) => {
    try {
      const result = await classService.updateClass(classId, classData);
      if (result.success) {
        await refreshClasses();
        return result.data;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update class")
      );
      throw err;
    }
  };

  const deleteClass = async (classId: string) => {
    try {
      const result = await classService.deleteClass(classId);
      if (result.success) {
        await refreshClasses();
        return true;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to delete class")
      );
      throw err;
    }
  };

  return {
    classes,
    isLoading,
    error,
    refreshClasses,
    addClass,
    updateClass,
    deleteClass,
  };
}

export function useClass(classId: string) {
  const [classData, setClassData] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchClass() {
      try {
        setIsLoading(true);
        const data = await classService.getClassById(classId);
        setClassData(data || null);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (classId) {
      fetchClass();
    }
  }, [classId]);

  const refreshClass = async () => {
    try {
      setIsLoading(true);
      const data = await classService.getClassById(classId);
      setClassData(data || null);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateClassData = async (updatedData: Partial<Class>) => {
    try {
      const result = await classService.updateClass(classId, updatedData);
      if (result.success) {
        await refreshClass();
        return result.data;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update class")
      );
      throw err;
    }
  };

  return {
    classData,
    isLoading,
    error,
    refreshClass,
    updateClassData,
  };
}
